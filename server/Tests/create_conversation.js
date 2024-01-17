const { afterAll, beforeAll, describe, it, expect,vi} = require("vitest");
const {createMongoInstance,disconnect} = require("../Helpers/db_instance");
const {closeTestServer,getTestServerInstance} = require("../Helpers/server_instance");
const {nanoid} = require("nanoid");
const {createconversation} = require("../API_calls/create_conversation");
const request = require('supertest');
const Conversations = require('../Models/Conversations');
const Messages = require('../Models/Messages');


describe('API test for Creating New Account', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(createconversation);
  });

  afterAll(async () => {
    mongooseInstance = await createMongoInstance();
    await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
  });


 it('Creating convo is success', async () => {
  const id1=`id${nanoid().toLowerCase()}`;
  const id2=`id${nanoid().toLowerCase()}`;
  const mockRequest = {
    senderId: id1,
    receiverId: id2,
  };
  const response = await request(serverInstance.app)
    .post('/api/conversation')
    .send(mockRequest)
    .expect(200);

  const conversationExists = await Conversations.exists({
    members: { $all: [mockRequest.senderId, mockRequest.receiverId] },
  });

  // Assertions
  expect(conversationExists).toBe(true);
});
});