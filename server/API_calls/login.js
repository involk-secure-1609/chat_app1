require('dotenv').config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const EmailSender = require("../EmailVerification/sendEmail");
const emailSender = new EmailSender();
const url1 = "http://localhost:3000/";
const Users = require("../Models/Users");
const login = express.Router();

login.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({msg:"Please fill all required fields"});
    } else 
    {
      const user = await Users.findOne({ email });
      if (!user) 
      {
        res.status(400).json({msg:"User does not exist,please create an account"});
      } 
      else if (user.verified === false) 
      {
        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
          res.status(400).json({msg:"User email or password is incorrect",loggedIn: false});
        } else if (!user.verified) {
          const url = `${url1}users/${user.id}/verify/`;
          await emailSender.sendEmail(user.email, "Verify Email", `Click on this ${url} to verify your account`);
          res.status(400).json({msg:"An Email sent to your account please verify",loggedIn: false});
          console.log("Email sent ");
        }
      } 
      else if (user.verified) 
      {
        const payload = {
          userId: user._id,
          email: user.email,
        };
        const JWT_SECRET_KEY =
          process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";

        jwt.sign(
          payload,
          JWT_SECRET_KEY,
          { expiresIn: 84600 },
          async (err, token) => {
            await Users.updateOne(
              { _id: user._id },
              {
                $set: { token },
              }
            );
            user.save();
            return res.status(200).json({
              user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
              },
              token: token,
            });
          }
        );
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

module.exports = { login };
