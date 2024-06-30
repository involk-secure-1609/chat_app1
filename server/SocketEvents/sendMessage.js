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

module.exports = (socket, io) => {
  socket.on("sendMessage",
    async ({ senderId, receiverId, message, conversationId }) => {

      var Userss=await client.HGETALL('userssd');
      console.log(Userss);
      console.log(senderId, receiverId)
      const redis_receiver = await client.hGet('userssd',receiverId);
      const redis_sender = await client.hGet('userssd',senderId);

      console.log(redis_receiver);
      console.log(redis_sender);
      // const receiver = users.find((user) => user.userId === receiverId);
      // const sender = users.find((user) => user.userId === senderId);
      const user = await Users.findById(senderId);
      // console.log(user.fullName);
      // console.log("sender :>> ", sender, receiver);


      if (redis_receiver) 
      {
        io.to(redis_receiver)
          .to(redis_sender)
          .emit("getMessage", {
            senderId,
            message,
            conversationId,
            receiverId,
            user: { id: user._id, fullName: user.fullName, email: user.email },
          });
      } 
      else 
      {
        io.to(redis_sender).emit("getMessage", 
        {
          senderId,
          message,
          conversationId,
          receiverId,
          user: { id: user._id, fullName: user.fullName, email: user.email },
        });
      }

      // if (receiver) {
      //   io.to(receiver.socketId)
      //     .to(sender.socketId)
      //     .emit("getMessage", {
      //       senderId,
      //       message,
      //       conversationId,
      //       receiverId,
      //       user: { id: user._id, fullName: user.fullName, email: user.email },
      //     });
      // } else {
      //   io.to(sender.socketId).emit("getMessage", {
      //     senderId,
      //     message,
      //     conversationId,
      //     receiverId,
      //     user: { id: user._id, fullName: user.fullName, email: user.email },
      //   });
      // }
    }
  );
};
