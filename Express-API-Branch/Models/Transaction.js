const mongoose = require('mongoose');


const TransactionSchema = mongoose.Schema( {
    accountNumber: {
        type: Number,
        required: true
    },
    processingDate: {
        type: Date,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    typeOfTransaction: {
        type: String, 
        required: false
    },
    transactionAmount: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true
    }

   
});

module.exports = mongoose.model('Transactions', TransactionSchema);