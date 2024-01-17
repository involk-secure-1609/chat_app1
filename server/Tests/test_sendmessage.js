const { afterAll, beforeAll, describe, it, expect,vi} = require("vitest");
const {createMongoInstance,disconnect} = require("../Helpers/db_instance");
const {closeTestServer,getTestServerInstance} = require("../Helpers/server_instance");
const {nanoid} = require("nanoid");
const {sendmessage} = require("../API_calls/send_message");
const request = require('supertest');
const Conversations = require('../Models/Conversations');
const Messages = require('../Models/Messages');
const {createTestConversation} = require('../Helpers/conversation_instance');

describe('API test for Creating New Account', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(sendmessage);
  });

  afterAll(async () => {
    mongooseInstance = await createMongoInstance();
    await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
  });

  it('if message is empty', async () => {
    const mockRequest = {
      conversationId: `id${nanoid().toLowerCase()}`,
      message: '',
      senderId: `id${nanoid().toLowerCase()}`,
      receiverId: `id${nanoid().toLowerCase()}`,

    };
    const response = await request(serverInstance.app).post('/api/send_message').send(mockRequest).expect(400);
    expect(response.body).toBe('Please fill all required fields');
  });

  it('if senderId is empty', async () => {
    const mockRequest = {
      conversationId: `id${nanoid().toLowerCase()}`,
      message: 'hello',
      senderId: '',
      receiverId: `id${nanoid().toLowerCase()}`,

    };
    const response = await request(serverInstance.app).post('/api/send_message').send(mockRequest).expect(400);
    expect(response.body).toBe('Please fill all required fields');
  });

  it('if receiverId and conversationId is empty', async () => {
    const mockRequest = {
      conversationId: ``,
      message: 'hello',
      senderId: `id${nanoid().toLowerCase()}`,
      receiverId: '',

    };
    const response = await request(serverInstance.app).post('/api/send_message').send(mockRequest).expect(400);
    expect(response.body).toBe('Please fill all required fields');
  });

   it('if conversation is New and sending is successfull', async () => {
    const id1=`id${nanoid().toLowerCase()}`;
    const id2=`id${nanoid().toLowerCase()}`;
    const msg=`msg${nanoid().toLowerCase()}`;
    const mockRequest = {
      conversationId: `new`,
      message: msg,
      senderId: id1,
      receiverId: id2,
    };
    const response = await request(serverInstance.app).post('/api/send_message').send(mockRequest).expect(200);
     const conversationExists = await Conversations.exists({
    members: { $all: [mockRequest.senderId, mockRequest.receiverId] },
  });
   const convo = await Conversations.find({
    members: { $all: [mockRequest.senderId, mockRequest.receiverId] },
  });

   const msgExists = await Messages.exists({
    senderId: id1,
    conversationId: convo._id,
    message: mockRequest.message,
  },
  );

    expect(conversationExists).toBe(true);
    expect(msgExists).toBe(true);

  });

  it('if conversation is not New and sending is successfull', async () => {
     const id1=`id${nanoid().toLowerCase()}`;
    const id2=`id${nanoid().toLowerCase()}`;
    const msg=`msg${nanoid().toLowerCase()}`;
    const convo =await createTestConversation();
    const mockRequest = {
      conversationId: convo._id,
      message: msg,
      senderId: id1,
      receiverId: id2,
    };
    const response = await request(serverInstance.app).post('/api/send_message').send(mockRequest).expect(200);
    const msgExists = await Messages.exists({
    senderId: id1,
    conversationId: convo._id,
    message: mockRequest.message,
  },
  );
  expect(msgExists).toBe(true);
  });
});