const express = require("express");
const bcryptjs = require("bcryptjs");
const register = express.Router();
const Users = require("../Models/Users");
const url1 = "http://localhost:3000/";
const EmailSender = require("../EmailVerification/sendEmail");
const emailSender = new EmailSender();

register.post("/api/register", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(410).send("Please fill all required fields");
    } else {
      const isAlreadyExist = await Users.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).send("User already exists");
      } else {
        const newUser = new Users({ fullName, email });
        newUser.set("verified", true);
        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });

        const url = `${url1}users/${newUser.id}/verify/`;
        await emailSender.sendEmail(newUser.email, "Verify Email", url);
        res
          .status(250)
          .send("An Email has been sent to your account,please verify");
        console.log("email sent");
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

module.exports = { register };
