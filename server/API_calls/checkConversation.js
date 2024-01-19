const express = require("express");
const checkConversation = express.Router();
const Conversations = require("../Models/Conversations");

checkConversation.post("/api/conversations/check", async (req, res) => {
  try {
    console.log("is called");
    const { senderId, receiverId = "" } = req.body;
    const existingConversation = await Conversations.findOne({
      members: { $all: [senderId, receiverId] },
    });
    // console.log(existingConversation);
    if (existingConversation) {
      console.log("yes");
      return res.status(200).json({ check: "false" });
    } else if (!existingConversation) {
      console.log("no");
      return res.status(200).json({ check: "true" });
    }
    console.log("has ended");
  } catch (error) {
    console.log("gone wrong");
    console.log(error, "Error");
  }
});

module.exports = { checkConversation };
