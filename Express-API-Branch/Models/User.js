const mongoose = require('mongoose');


const AccountSchema = mongoose.Schema( {
    balance: 
    {
    type: Number,
    default: 0,
    required: true
    },
    

   
});



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
    account: [AccountSchema]
   
});

module.exports = mongoose.model('Users', UserSchema);