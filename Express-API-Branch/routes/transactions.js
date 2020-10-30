const express = require('express');
const router = express.Router();
const Transaction = require('../Models/Transaction');
const User = require('../Models/User')
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/', (req,res) => {
    Transaction.find({}, function(err, results){
        res.render('userDashBoard', {mydata: results}); //woah it worked
    });
    
});

router.use(express.urlencoded({
    extended: true
  }))

router.post('/newTransaction', (req, res) => {
 
    const transaction = new Transaction({
        processingDate: Date.now(),
        typeOfTransaction: req.body.typeOfTransaction,
        transactionAmount: req.body.transactionAmount,
        description: req.body.description,
        username: req.body.username,
        location: req.body.location,
        state: req.body.state

    });


    //SAVES TO DB
    transaction.save()
    .then(data => {
        updateBalance(transaction.username, transaction.transactionAmount, res, transaction.typeOfTransaction);
        checkRules(transaction.username, transaction.transactionAmount, res, transaction.location);
        console.log("Transaction saved: " + transaction._id);
    })
    .catch(err => {
        res.json({message: err})
    })
    

});

function updateBalance(myusername, amount, res, typeTransaction) {
    if (typeTransaction === "cr")
    {
        User.findOneAndUpdate({username: myusername}, {"$inc" :{"account.balance" : amount}}, {new: true})
        .then()
        .catch(err =>console.log('Error: ' + err));
    }
    else if (typeTransaction === "dr")
    {
        User.findOneAndUpdate({username: myusername}, {"$inc" :{"account.balance" : -amount}}, {new: true})
        .then(User => res.json(User))
        .catch(err =>console.log('Error: ' + err));
    }
}

function checkRules(myusername, amount, res, vendor){
    User.findOne({username: myusername})
    .then(User => 
        {
            var rulesBroken = "Transaction rules broken: ";
            if (amount > User.account.transactionRules.overAmount)
            {
                rulesBroken = rulesBroken.concat("Over " + User.account.transactionRules.overAmount + ", ");
            }
    
            if (User.account.transactionRules.atVendor.includes(vendor))
            {
                rulesBroken = rulesBroken.concat("Vendor: " + vendor)
            }
            res.json(rulesBroken);
        })
        
        
    .catch(err =>console.log('Error: ' + err));
}

router.route('/getTransactions/:username').get((req, res) => {
    Transaction.find({username: req.params.username})
    .then(Transaction=> res.json(Transaction))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;