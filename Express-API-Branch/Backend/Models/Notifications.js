const mongoose = require('mongoose');


const NotificationsSchema = mongoose.Schema( {
    Date: {
        type: Date,
        required: true
    },
    Message: {
        type: String,
        required: false
    },
    Amount: {
        type: Number,
        required: false
    },
    Balance: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Notifications', NotificationsSchema);
