const UseSendMessage = async ({ socket, user, messages, message }) => {
  try {
    // console.log(senderId,receiverId);
    // socket?.emit('')
    // await socket?.emit("addUser", user?.id);
    socket?.emit('sendMessage', {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
    });

     const res1 = await fetch(`http://localhost:8000/api/conversations/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
    const resData=await res1.json();
    const isNew=resData.check;
      // Send message through API
    const res = await fetch(`http://localhost:8000/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });   
      // if (isNew==='true') {
        socket?.emit('getConvo', {
          senderId: user?.id,
          receiverId: messages?.receiver?.receiverId,
          message,
          isNew:isNew,
        });
      // }
    // }, 4000);
  // } 

  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export default UseSendMessage;