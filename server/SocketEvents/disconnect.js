module.exports = (socket, io, users) => {
  socket.on("disconnecting", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
};
