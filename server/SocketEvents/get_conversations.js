const { createClient } =require('redis');
const client = createClient({
    password: 'rPeQ7RGBCTCAeRSrYGrPME4dT0BLJXU2',
    socket: {
        host: 'redis-11756.c232.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11756
    }
});
client.connect();
const Users = require("../Models/Users");
const Conversations = require("../Models/Conversations");

module.exports = (socket, io) => {
  socket.on("getConvo", async ({ senderId, receiverId, isNew }) => {

    // console.log(senderId, receiverId);

    const redis_receiver = await client.hGet('userssd',receiverId,function(err,reply){
      console.log(reply);
    });
    const redis_sender = await client.hGet('userssd',senderId,function(err,reply){
      console.log(reply);
    });


    // const receiver = users.find((user) => user.userId === receiverId);
    // const sender = users.find((user) => user.userId === senderId);
    console.log("conversations updated");

    // console.log(senderId);console.log(receiverId);
    // console.log(isNew);
    const isIt = isNew == "true" ? true : false;
    // console.log(isIt);
    const receiver1 = await Users.findById(receiverId);
    // console.log(receiver1);
    const sender1 = await Users.findById(senderId);
    // console.log(conversationId);
    // console.log(sender1.fullName);
    const convo = await Conversations.findOne({
      members: { $all: [senderId, receiverId] },
    });
    const convoId = convo._id;
    // console.log(convoId);
    if (redis_receiver) 
    {
      io.to(redis_receiver).to(redis_sender).emit("getConversations", 
      {
        convoId,
        receiver1,
        sender1,
        isIt,
      });
    } 
    else
     {
      io.to(redis_sender).emit("getConversations", 
      {
        convoId,
        receiver1,
        sender1,
        isIt,
      });
    }
  });
};
