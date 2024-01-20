import Conversations from '../Models/Conversations';

function createTestConversation(senderId,receiverId) {
    
  return Conversations.create({
    members: [ senderId, receiverId],
  });

};
module.exports ={createTestConversation};