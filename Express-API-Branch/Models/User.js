const mongoose = require('mongoose');


const UserSchema = mongoose.Schema( {
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        balance: {
            type: Number,
            default: 0,
            required: true
        },
        transactionRules: {
            overAmount: {
                type: Number
            },
            withinState: {
                type: [String]
            },
            atVendor: {
                type: [String]
            }
        }
    }
   
});

module.exports = mongoose.model('Users', UserSchema);