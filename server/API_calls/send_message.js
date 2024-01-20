const express = require("express");
const sendmessage = express.Router();
const Conversations = require("../Models/Conversations");
const Messages = require("../Models/Messages");

sendmessage.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;
    if (!senderId || !message)
      return res.status(400).json({msg:"Please fill all required fields"});
    // console.log(senderId);console.log(receiverId);
    const conversations = await Conversations.find({
      members: { $all: [senderId, receiverId] },
    });
    // console.log(conversations.length);
    const existingConversation = await Conversations.findOne({
      members: { $all: [senderId, receiverId] },
    });
    // console.log(conversationId);
    if (existingConversation) {
      console.log(existingConversation._id);
      // conversationId=existingConversation._id;
    }
    // console.log(conversations.length);
    if (conversationId === "new" && receiverId && !existingConversation) {
      const newCoversation = new Conversations({
        members: [senderId, receiverId],
      });
      await newCoversation.save();
      // console.log(newCoversation._id);
      const newMessage = new Messages({
        conversationId: newCoversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res.status(200).json("message sent successfully");
    } else if (!conversationId && !receiverId) {
      return res.status(400).json("Please fill all required fields");
    } else {
      const newMessage = new Messages({
        conversationId: existingConversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res.status(200).json("Message sent successfully");
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

module.exports = { sendmessage };
