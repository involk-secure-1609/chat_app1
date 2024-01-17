const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
import EmailSender from '../EmailVerification/sendEmail';
const emailSender = new EmailSender();

const Users = require("../Models/Users");

const login = express.Router();

login.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Please fill all required fields");
    } 
    else 
    {
      const user = await Users.findOne({ email });
      if (!user) 
      {
        res.status(400).send("User email or password is incorrect");
      } 
      else if(user.verified===false)
      {
        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) 
        {
          res.status(400).send("User email or password is incorrect");
        } 
        else if (!user.verified) 
        {
            const url = `${process.env.BASE_URL}users/${user.id}/verify/`;
            await emailSender.sendEmail(user.email, "Verify Email", url);
            res.status(230).send( "An Email sent to your account please verify" );
            console.log("Email sent ");
        }
        } 
        else if(user.verified)
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
              return res
                .status(200)
                .json({
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
    }
    catch (error) 
    {
    console.log(error, "Error");
  }
  } 
);

module.exports = { login };