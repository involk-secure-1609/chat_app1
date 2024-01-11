const express = require('express');
const sendmessage=express.Router()
const { Users } = require('../Models/Users');
const { Conversations } = require('../Models/Conversations');
const { Messages } = require('../Models/Messages');


sendmessage.post('/api/message', async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;
        if (!senderId || !message) return res.status(400).send('Please fill all required fields')
        if (conversationId === 'new' && receiverId) {
            const newCoversation = new Conversations({ members: [senderId, receiverId] });
            await newCoversation.save();
            const newMessage = new Messages({ conversationId: newCoversation._id, senderId, message });
            await newMessage.save();
            return res.status(200).send('Message sent successfully');
        } else if (!conversationId && !receiverId) {
            return res.status(400).send('Please fill all required fields')
        }
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.log(error, 'Error')
    }
})

module.exports = { sendmessage };
