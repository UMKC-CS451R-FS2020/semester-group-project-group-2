const mongoose = require('mongoose');

const NotificationRulesBrokenSchema = mongoose.Schema ({
    notificationRules: {
        relation: {
            type: String
        },
        typeItem: {
            type: String
        },
        limit: {
            type: Number
        },
    }


})

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
    state: {
        type: String
    },
    startingBalance: {
        type: Number
    },
    endingBalance: {
        type: Number
    },
    transactionRulesBroken: {
        type: [NotificationRulesBrokenSchema.notificationRules]
    },
    vendor: {
        type: String
    }

});

module.exports = mongoose.model('Transactions', TransactionSchema);
