const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String
    },
    message: {
        type: String
    }
});
mongoosemodels={}

const Messages = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = Messages;