import { afterAll, beforeAll, describe, it, expect, vi } from "vitest";
import { createMongoInstance, disconnect } from "../Test_Helpers/db_instance";
import { closeTestServer, getTestServerInstance } from "../Test_Helpers/server_instance";
import { checkConversation } from "../API_calls/checkConversation";
import request from 'supertest';
import { createTestUser, createTestUserWithValidation } from "../Test_Helpers/user_instance";
import { createTestConversation } from "../Test_Helpers/conversation_instance";


describe('API test for checking conversations', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(checkConversation);
  });

  afterAll(async () => {
    // mongooseInstance = await createMongoInstance();
    // await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
  });


 it('Conversation does not already exist', async () => {
  const user1=await createTestUser();
  const user2=await createTestUser();

  const mockRequest = {
    senderId: user1.id,
    receiverId: user2.id,
  };
  const response = await request(serverInstance.app)
    .post('/api/conversation')
    .send(mockRequest)
    .expect(404);

    // expect(response.body.check).toBe("true");
});

 it('Conversation does already exist', async () => {
  const user1=await createTestUser();
  const user2=await createTestUser();
  console.log(user1._id);console.log(user2._id);
  const convo=await createTestConversation(user1._id,user2._id);
  const mockRequest = {
    senderId: user1._id,
    receiverId: user2._id,
  };
  const response = await request(serverInstance.app)
    .post('/api/conversations/check')
    .send(mockRequest)
    .expect(200);

    // expect(response.body.check).toBe("false");
});

});

