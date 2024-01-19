const express = require("express");
const getconversation = express.Router();
const Users = require("../Models/Users");
const Conversations = require("../Models/Conversations");

getconversation.get("/api/conversations/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({
      members: { $in: [userId] },
    });
    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await Users.findById(receiverId);
        return {
          user: {
            receiverId: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          conversationId: conversation._id,
        };
      })
    );
    res.status(200).json(conversationUserData);
    console.log("success");
  } catch (error) {
    console.log("gone wrong");
    console.log(error, "Error");
  }
});

module.exports = { getconversation };
