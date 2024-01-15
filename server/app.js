const express = require('express');
const { getmessages } = require('./API_calls/get_message');
const { getconversation } = require('./API_calls/get_conversations');
const { getusers } = require('./API_calls/get_users');
const { login } = require('./API_calls/login');
const { register } = require('./API_calls/register');
const { sendmessage } = require('./API_calls/send_message');
const {verify } = require('./API_calls/verify');
const { createconversation } = require('./API_calls/create_conversation');
const addUserHandler = require('./SocketEvents/addUser');
const sendMessageHandler = require('./SocketEvents/sendMessage');
const disconnectHandler = require('./SocketEvents/disconnect');
const cors = require('cors');
const io = require('socket.io')(8080, {
    cors: {
        origin: 'http://localhost:3000',
    }
});
const app= express();

// Connect DB
require('./db/connection');

// Import Files

const port=process.env.PORT || 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(getconversation);
app.use(getmessages);
app.use(getusers);
app.use(createconversation);
app.use(login);
app.use(register);
app.use(sendmessage);
app.use(verify);
app.get('/', (req, res) => {
    res.send('Hello World');
    res.end
})

// Socket.io
let users = [];
io.on('connection', socket => {
    addUserHandler(socket, io, users);
    sendMessageHandler(socket, io, users);
    disconnectHandler(socket, io, users);
});

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(port, () => {
    console.log('Server is running on port'+ port);
})