const express =require('express');
const { createClient } =require('redis');
const { getmessages } = require('./API_calls/get_message');
const { getconversation } = require('./API_calls/get_conversations');
const { getusers } = require('./API_calls/get_users');
const { login } = require('./API_calls/login');
const { register } = require('./API_calls/register');
const { sendmessage } = require('./API_calls/send_message');
const {verify } = require('./API_calls/verify');
const { createconversation } = require('./API_calls/create_conversation');
const {checkConversation } = require('./API_calls/checkConversation');
const addUserHandler = require('./SocketEvents/addUser');
const sendMessageHandler = require('./SocketEvents/sendMessage');
const disconnectHandler = require('./SocketEvents/disconnect');
const getconversationHandler = require('./SocketEvents/get_conversations');

const cors = require('cors');
const io = require('socket.io')(8080, {
    cors: {
        origin: 'http://localhost:3000',
    }
});
const app= express();

// Connect DB
require('./db/connection');``

// API-CALLS
const port=process.env.PORT || 8000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(getconversation);
app.use(getmessages);
app.use(getusers);
app.use(createconversation);
app.use(checkConversation);
app.use(login);
app.use(register);
app.use(sendmessage);
app.use(verify);

app.get('/', (req, res) => {
    res.send('Hello World');
    res.end
})

// REDIS
const client = createClient({
    password: 'rPeQ7RGBCTCAeRSrYGrPME4dT0BLJXU2',
    socket: {
        host: 'redis-11756.c232.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11756
    }
});
client.connect();


client.on('connect',function(){
    console.log('Connected');
})
// Socket.io
// let users = [];
// let currentUser="";
io.on('connection', socket => {

    addUserHandler(socket, io);
    sendMessageHandler(socket, io);
    disconnectHandler(socket, io);
    getconversationHandler(socket, io);
    // io.emit('getUsers', socket.userId);
});


app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(port, () => {
    console.log('Server is running on port'+ port);
})