const Users = require("../Models/Users");
const Conversations = require("../Models/Conversations");

module.exports = (socket, io, users) => {
  socket.on("getConvo", async ({ senderId, receiverId, isNew }) => {
    const receiver = users.find((user) => user.userId === receiverId);
    const sender = users.find((user) => user.userId === senderId);
    console.log("conversations updated");

    // console.log(senderId);console.log(receiverId);
    console.log(isNew);
    const isIt = isNew == "true" ? true : false;
    console.log(isIt);
    const receiver1 = await Users.findById(receiverId);
    // console.log(receiver1);
    const sender1 = await Users.findById(senderId);
    // console.log(conversationId);
    // console.log(sender1.fullName);
    const convo = await Conversations.findOne({
      members: { $all: [senderId, receiverId] },
    });
    const convoId = convo._id;
    console.log(convoId);
    if (receiver) {
      io.to(receiver.socketId).to(sender.socketId).emit("getConversations", {
        convoId,
        receiver1,
        sender1,
        isIt,
      });
    } else {
      io.to(sender.socketId).emit("getConversations", {
        convoId,
        receiver1,
        sender1,
        isIt,
      });
    }
  });
};
