const { createClient, ClientClosedError } =require('redis');
const client = createClient({
    password: 'rPeQ7RGBCTCAeRSrYGrPME4dT0BLJXU2',
    // legacyMode: true,
    socket: {
        host: 'redis-11756.c232.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11756
    }
});
client.connect();

module.exports = (socket, io) => {
  
  socket.on("addUser", async (userId) => {

    const doesSocketExist=await client.HEXISTS('sockets',socket.id);  
    
    // conso
    // const isUserExist = users.find((user) => user.userId === userId);
    if(!doesSocketExist)
    {

      console.log(socket.id);
      await client.HSET('sockets',socket.id,userId);
      await client.HSET('userssd',userId,socket.id);
      // // await client.HDEL('users-sockets','hello');
      // const sockets=await client.HGETALL('sockets');
      // // const Users=[];
      const Users=await client.HGETALL('userssd');
      console.log(Users);
    
    }
    else if(doesSocketExist)
    {

      // await client.HSET('users-sockets',userId,socket.id);
      // await client.SADD('users','userId');
      // await client.HSET('users-sockets',userId,socket.)
      // const members=await client.HGETALL('users-sockets');
   

    }
    // if (!isUserExist) {
    //   const user = { userId, socketId: socket.id };
    //   users.push(user);
    //   io.emit("getUsers", users);
    // }
  });
};
