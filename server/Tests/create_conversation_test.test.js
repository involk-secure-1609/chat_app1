import { afterAll, beforeAll, describe, it, expect, vi } from "vitest";
import { createMongoInstance, disconnect } from "../Test_Helpers/db_instance";
import { closeTestServer, getTestServerInstance } from "../Test_Helpers/server_instance";
import { nanoid } from "nanoid";
import { createconversation } from "../API_calls/create_conversation";
import request from 'supertest';
import Conversations from '../Models/Conversations';


describe('API test for Creating New Conversations', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(createconversation);
  });

  afterAll(async () => {
    // mongooseInstance = await createMongoInstance();
    // await disconnect(mongooseInstance);
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

 
  // Assertions
});
});