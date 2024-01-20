const express = require("express");
const verify = express.Router();
const Users = require("../Models/Users");

verify.get("/api/users/:id/verify/", async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await Users.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    console.log("user found");
    await user.updateOne({ verified: true });
    console.log("Verified successfully");
    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.log("Verified unsuccessfully");
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = { verify };

