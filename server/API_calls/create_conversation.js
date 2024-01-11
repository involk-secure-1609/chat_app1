const express = require('express');

const createconversation=express.Router()
const { Users } = require('../Models/Users');
const { Conversations } = require('../Models/Conversations');
const { Messages } = require('../Models/Messages');





createconversation.post('/api/conversation', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newCoversation = new Conversations({ members: [senderId, receiverId] });
        await newCoversation.save();
        res.status(200).send('Conversation created successfully');
    } catch (error) {
        console.log(error, 'Error')
    }
})

module.exports = { createconversation};
