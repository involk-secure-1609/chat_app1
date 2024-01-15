import React from "react";
const UseSendMessage = async ({ socket, user, messages, message }) => {
  try {
    // Emit message through socket
    socket?.emit('sendMessage', {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
    });

    // Send message through API
    const res = await fetch(`http://localhost:8080/api/message`, {
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

    // Handle response if needed
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export default UseSendMessage;





 // const sendMessage = async (e) => { 
	// 	setMessage('')
	// 	socket?.emit('sendMessage', {
	// 		senderId: user?.id,
	// 		receiverId: messages?.receiver?.receiverId,
	// 		message,
	// 		conversationId: messages?.conversationId
	// 	});
	// 	const res = await fetch(`http://localhost:8000/api/message`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			conversationId: messages?.conversationId,
	// 			senderId: user?.id,
	// 			message,
	// 			receiverId: messages?.receiver?.receiverId
	// 		})
	// 	});
	// }