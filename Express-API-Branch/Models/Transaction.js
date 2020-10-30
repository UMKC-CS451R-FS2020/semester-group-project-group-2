const mongoose = require('mongoose');


const TransactionSchema = mongoose.Schema( {
    processingDate: {
        type: Date,
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
    },
    username: {
        type: String
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('Transactions', TransactionSchema);