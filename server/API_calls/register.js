const express = require('express');
const bcryptjs = require('bcryptjs');
const register=express.Router()
const Users = require('../Models/Users');
const sendEmail = require('../EmailVerification/sendEmail');
const url1="http://localhost:3000/"

register.post('/api/register', async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            res.status(400).send('Please fill all required fields');
        } else {
            const isAlreadyExist = await Users.findOne({ email });
            if (isAlreadyExist) {
                res.status(400).send('User already exists');
            } else {
                const newUser = new Users({ fullName, email });
                newUser.set('verified', false);
                bcryptjs.hash(password, 10, (err, hashedPassword) => {
                    newUser.set('password', hashedPassword);
                    newUser.save();
                    next();
                })
              
		        const url = `${url1}users/${newUser.id}/verify/`;
		        await sendEmail(newUser.email, "Verify Email", url);
                res.status(250).send("An Email has been sent to your account,please verify");
                console.log("email sent");
            }
        }

    } catch (error) {
        console.log(error, 'Error')
    }
})


module.exports = { register };
