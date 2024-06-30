const { createClient } =require('redis');
const client = createClient({
    password: 'rPeQ7RGBCTCAeRSrYGrPME4dT0BLJXU2',
    // legacyMode: true,
    socket: {
        host: 'redis-11756.c232.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11756
    }
});
client.connect();

module.exports = (socket, io,) => {

  socket.on("disconnect", async (userId) => {

    var sockets=await client.HGETALL('sockets');
    var Users=await client.HGETALL('userssd');
    // console.log(sockets);
    console.log(Users);
    console.log("socket disconnected");
    const UserId = await client.HGET('sockets',socket.id);
    console.log(UserId);
    // const SocketId=await client.HGET('users',UserId);

    if(UserId!=null)
    {
        await client.HDEL('sockets',socket.id); 
        await client.HDEL('userssd',UserId);
        Users=await client.HGETALL('userssd');
        sockets=await client.HGETALL('sockets');
        console.log(Users);
        // console.log(sockets);
    }

    // users = users.filter((user) => user.socketId !== socket.id);
    // io.emit("getUsers", Users);
  });
};
