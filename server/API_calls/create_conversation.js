const express = require('express');

const createconversation=express.Router()
const  Conversations  = require('../Models/Conversations');
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
