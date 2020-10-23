const express = require('express');
const router = express.Router();
const Transaction = require('../Models/Transaction');
const bodyParser = require('body-parser');
const { Mongoose } = require('mongoose');
const { findOne } = require('../Models/Transaction');
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
        accountNumber: 44,
        processingDate: Date.now(),
        balance: 44,
        typeOfTransaction: req.body.typeOfTransaction,
        transactionAmount: req.body.transactionAmount,
        description: req.body.description

    });

    //SAVES TO DB
    transaction.save()
    .then(data => {
        res.redirect('/transactions');
        //res.json(data);
    })
    .catch(err => {
        res.json({message: err})
    })
    console.log(transaction);

});

module.exports = router;