const express = require('express');
const router = express.Router();
const Transaction = require('../Models/Transaction');
const User = require('../Models/User')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', (req, res) => {
  Transaction.find({}, function(err, results) {
    res.render('userDashBoard', {
      mydata: results
    });
  });
});

router.use(express.urlencoded({
  extended: true
}))

router.post('/newTransaction', (req, res) => {
  console.log(req.body);

  const transaction = new Transaction({
    processingDate: Date.now(),
    typeOfTransaction: req.body.typeOfTransaction,
    vendor: req.body.vendor,
    transactionAmount: req.body.transactionAmount,
    description: req.body.description,
    username: req.body.username,
    vendor: req.body.location,
    state: req.body.state,
    startingBalance: 0,
    endingBalance: 0

  });

  //SAVES TO DB

  transaction.save()
    .then(data => {
      updateBalance(transaction.username, transaction.transactionAmount, res, transaction.typeOfTransaction, transaction);
      checkRules(transaction, transaction.username, transaction.transactionAmount, res, transaction.location, transaction.id);
      console.log("Transaction saved: " + transaction._id);
    })
    .catch(err => {
      res.json({
        message: err
      })
    })

});

router.post('/newRule', (req, res) => {
  const tempName = "Jumbo12";
  const newRule = {
    "overUnderSame": req.body.Relation,
    "typeItem": req.body.typeItem,
    "transAmount": req.body.Amount
  };
  User.findOneAndUpdate({
      username: tempName
    }, {
      "$push": {
        "account.notificationRules": newRule
      },
      new: true
    })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/newRuleTime', (req, res) => {
  const newRule = {
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
  }
  const tempName = "Jumbo12"
  User.findOneAndUpdate({
      username: tempName
    }, {
      "$set": {
        "account.betweenTimeRule": newRule
      },
      new: true
    })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.post('/newRuleState', (req, res) => {
  const newRule = {
    withinStateRule: req.body.withinStateRule
  }
  const tempName = "Jumbo12"
  console.log(newRule);
  User.findOneAndUpdate({
      username: tempName
    }, {
      "$set": {
        "account.withinStateRule": newRule.withinStateRule
      },
      new: true
    })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

function updateTransaction(res, transact) {
  if (transact.typeOfTransaction === "cr") {
    User.findOne({
        username: transact.username
      })
      .then(User =>
        Transaction.findByIdAndUpdate({
          _id: transact._id
        }, {
          "$set": {
            "endingBalance": User.account.balance + transact.transactionAmount
          },
          "startingBalance": User.account.balance
        }, {
          new: true
        })
        .then(trans => console.log(trans))
        .catch(err => res.status(400).json('Error: ' + err))

      )
      .catch(err => console.log(err));
  } else if (transact.typeOfTransaction === "dr") {
    User.findOne({
        username: transact.username
      })
      .then(User =>
        Transaction.findByIdAndUpdate({
          _id: transact._id
        }, {
          "$set": {
            "endingBalance": User.account.balance - transact.transactionAmount
          },
          "startingBalance": User.account.balance
        }, {
          new: true
        })
        .then(trans => console.log(trans))
        .catch(err => res.status(400).json('Error: ' + err))

      )
      .catch(err => console.log(err));
  }
}

function updateRulesBroken(rules, id, transaction) {
  let notificationRulesBroken = [];

  let a = {
    relation: 'time',
    typeItem: 'barf',
    limit: 5
  }
  rules.map(num => {
    if (num.relation == "Out of state") {
      let notificationRuleBroken = {
        relation: num.relation,
        typeItem: '',
        limit: num.currentState
      }
      notificationRulesBroken.push(notificationRuleBroken)
    }
    if (num.relation == "Between time") {
      let notificationRuleBroken = {
        relation: num.relation,
        typeItem: '',
        limit: num.betweenTime
      }
      notificationRulesBroken.push(notificationRuleBroken)
    } else if (num.relation != "Between time" && num.relation != "Out of state") {
      let notificationRuleBroken = {
        relation: num.relation,
        typeItem: num.typeTransaction,
        limit: num.limit
      }
      notificationRulesBroken.push(notificationRuleBroken)
    }

  })

  console.log('```````````DATA`````````````');
  console.log(notificationRulesBroken);
  Transaction.findByIdAndUpdate({
      _id: id
    }, {
      "$set": {
        "transactionRulesBroken": notificationRulesBroken
      }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function updateBalance(myusername, amount, res, typeTransaction, transact) {
  if (typeTransaction === "cr") {
    User.findOneAndUpdate({
        username: myusername
      }, {
        "$inc": {
          "account.balance": amount
        }
      }, {
        new: true
      })
      .then(updateTransaction(res, transact))
      .catch(err => console.log('Error: ' + err));
  } else if (typeTransaction === "dr") {
    User.findOneAndUpdate({
        username: myusername
      }, {
        "$inc": {
          "account.balance": -amount
        }
      }, {
        new: true
      })
      .then(updateTransaction(res, transact))
      .catch(err => console.log('Error: ' + err));
  }
}

function checkRules(transaction, myusername, amount, res, vendor, id) {
  User.findOne({
      username: myusername
    })
    .then(User => {
      let notificationRulesBroken = [];
      let notificationRules = User.account.notificationRules;
      for (let i = 0; i < notificationRules.length; i++) {
        if (notificationRules[i].overUnderSame == "Equals" && amount == notificationRules[i].transAmount) {
          if (notificationRules[i].typeItem == "Deposit" && transaction.typeOfTransaction == "cr") {
            let ruleBroken = {
              relation: "Equals",
              typeTransaction: "Deposit",
              limit: notificationRules[i].transAmount
            }
            notificationRulesBroken.push(ruleBroken);
          } else if (notificationRules[i].typeItem == "Withdrawal" && transaction.typeOfTransaction == "dr") {
            let ruleBroken = {
              relation: "Equals",
              typeTransaction: "Withdrawal",
              limit: notificationRules[i].transAmount
            }
            notificationRulesBroken.push(ruleBroken);
          }
        } else if (notificationRules[i].overUnderSame == "Is Less Than" && amount < notificationRules[i].transAmount) {
          if (notificationRules[i].typeItem == "Deposit" && transaction.typeOfTransaction == "cr") {
            let ruleBroken = {
              relation: "Is Less Than",
              typeTransaction: "Deposit",
              limit: notificationRules[i].transAmount

            }
            notificationRulesBroken.push(ruleBroken);
          } else if (notificationRules[i].typeItem == "Withdrawal" && transaction.typeOfTransaction == "dr") {
            let ruleBroken = {
              relation: "Is Less Than",
              typeTransaction: "Withdrawal",
              limit: notificationRules[i].transAmount

            }
            notificationRulesBroken.push(ruleBroken);
          }
        } else if (notificationRules[i].overUnderSame == "Is Greater Than" && amount > notificationRules[i].transAmount) {
          if (notificationRules[i].typeItem == "Deposit" && transaction.typeOfTransaction == "cr") {
            let ruleBroken = {
              relation: "Is Greater Than",
              typeTransaction: "Deposit",
              limit: notificationRules[i].transAmount

            }
            notificationRulesBroken.push(ruleBroken);
          } else if (notificationRules[i].typeItem == "Withdrawal" && transaction.typeOfTransaction == "dr") {
            let ruleBroken = {
              relation: "Is Greater Than",
              typeTransaction: "Withdrawal",
              limit: notificationRules[i].transAmount
            }
            notificationRulesBroken.push(ruleBroken);
          }
        }
      }

      if (User.account.withinStateRule != transaction.state && User.account.withinStateRule != null) {
        console.log("State rule broken");
        let ruleBroken = {
          relation: "Out of state",
          typeItem: transaction.state,
          currentState: User.account.withinStateRule,
        }
        notificationRulesBroken.push(ruleBroken);
      }

      ;
      let parseTime = transaction.processingDate.toTimeString();
      let parseTimeAgain = parseTime.substr(0, 8) + '';
      let fromTime = User.account.betweenTimeRule.fromTime;
      let toTime = User.account.betweenTimeRule.toTime;
      console.log("BLAHBLAH" + parseTimeAgain);
      console.log("Time: " + parseTimeAgain);
      if (Date.parse('01/01/2011' + ' ' + parseTimeAgain) > Date.parse('01/01/2011' + ' ' + fromTime)) {
        if (Date.parse('01/01/2011' + ' ' + parseTimeAgain) < Date.parse('01/01/2011' + ' ' + toTime)) {
          let timeRule = {
            relation: "Between time",
            betweenTime: fromTime + " " + toTime
          }
          notificationRulesBroken.push(timeRule);
        }
      }
      notificationRulesBroken.map(data => console.log(data));
      if (notificationRulesBroken.length === 0) {
        res.json("No transaction rules broken")
      } else {
        updateRulesBroken(notificationRulesBroken, id, transaction);
        res.json("Haha");
      }
    })
    .catch(err => console.log('Error: ' + err));
}

router.route('/getTransactions/:username').get((req, res) => {
  Transaction.find({
      username: req.params.username
    })
    .then(Transaction => res.json(Transaction))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
