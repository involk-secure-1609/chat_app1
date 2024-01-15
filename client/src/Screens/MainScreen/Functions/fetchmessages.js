// NotUsed

import { useState } from 'react';

const useFetchMessages = (user) => {
  const [messages, setMessages] = useState({ messages: [], receiver: null, conversationId: null });

  const fetchMessages = async (conversationId, receiver) => {
    try {
      // send a request to the API which gets messages
      const res = await fetch(`http://localhost:8080/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await res.json();
      setMessages({ messages: resData, receiver, conversationId });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return { messages, fetchMessages };
};

export default useFetchMessages;