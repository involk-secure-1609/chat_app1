const { nanoid } = require('nanoid');
const Conversations = require('../Models/Conversations');

function createTestConversation() {
    
  return Conversations.create({
    members: [`user1${nanoid().toLowerCase()}`, `user2${nanoid().toLowerCase()}`],
  });

};
module.exports ={createTestConversation};