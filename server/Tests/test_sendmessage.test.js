import { afterAll, beforeAll, describe, it, expect, vi } from "vitest";
import { createMongoInstance, disconnect } from "../Test_Helpers/db_instance";
import { closeTestServer, getTestServerInstance } from "../Test_Helpers/server_instance";
import { nanoid } from "nanoid";
import { sendmessage } from "../API_calls/send_message";
import request from 'supertest';
import Conversations from '../Models/Conversations';
import Messages from '../Models/Messages';
import { createTestConversation } from '../Test_Helpers/conversation_instance';

describe('API test for sending new messages', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(sendmessage);
  });

  afterAll(async () => {
    // mongooseInstance = await createMongoInstance();
    // await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
  });

  it('if message is empty', async () => {
    const mockRequest = {
      conversationId: `id${nanoid().toLowerCase()}`,
      message: '',
      senderId: `id${nanoid().toLowerCase()}`,
      receiverId: `id${nanoid().toLowerCase()}`,

    };
    const response = await request(serverInstance.app).post('/api/message').send(mockRequest).expect(400);
    expect(response.body.msg).toBe('Please fill all required fields');
  });

  it('if senderId is empty', async () => {
    const mockRequest = {
      conversationId: `id${nanoid().toLowerCase()}`,
      message: 'hello',
      senderId: '',
      receiverId: `id${nanoid().toLowerCase()}`,

    };
    const response = await request(serverInstance.app).post('/api/message').send(mockRequest).expect(400);
    expect(response.body.msg).toBe('Please fill all required fields');
  });

  it('if receiverId and conversationId is empty', async () => {
    const mockRequest = {
      conversationId: ``,
      message: 'hello',
      senderId: `id${nanoid().toLowerCase()}`,
      receiverId: '',

    };
    const response = await request(serverInstance.app).post('/api/message').send(mockRequest).expect(400);
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
    const response = await request(serverInstance.app).post('/api/message').send(mockRequest).expect(200);
  //    const conversationExists = await Conversations.exists({
  //   members: { $all: [mockRequest.senderId, mockRequest.receiverId] },
  // });
  //  const convo = await Conversations.exists({
  //   members: { $all: [mockRequest.senderId, mockRequest.receiverId] },
  // });

  //  const msgExists = await Messages.exists({
  //   senderId: id1,
  //   conversationId: convo._id,
  //   message: mockRequest.message,
  // },
  // );

  //   // expect(conversationExists).toBe(true);
  //   expect(msgExists).toBe(true);

  });

  it('if conversation is not New and sending is successfull', async () => {
     const id1=`id${nanoid().toLowerCase()}`;
    const id2=`id${nanoid().toLowerCase()}`;
    const msg=`msg${nanoid().toLowerCase()}`;
    const convo =await createTestConversation(id1, id2);
    console.log(convo._id);
    const mockRequest = {
      conversationId: convo._id,
      message: msg,
      senderId: id1,
      receiverId: id2,
    };
    const response = await request(serverInstance.app).post('/api/message').send(mockRequest).expect(200);
  //   const msgExists = await Messages.exists({
  //   senderId: id1,
  //   conversationId: convo._id,
  //   message: mockRequest.message,
  // },);
  // expect(msgExists).toBe(true);
  });
});