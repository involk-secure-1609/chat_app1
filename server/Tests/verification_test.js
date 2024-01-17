const { afterAll, beforeAll, describe, it, expect,vi} = require("vitest");
const {createMongoInstance,disconnect} = require("../Helpers/db_instance");
const {closeTestServer,getTestServerInstance} = require("../Helpers/server_instance");
const {createTestUser} = require("../Helpers/user_instance");
const {nanoid} = require("nanoid");
const {verify} = require("../API_calls/verify");
const request = require('supertest');
const Conversations = require('../Models/Conversations');
const Messages = require('../Models/Messages');


describe('API test for verification', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(verify);
  });

  afterAll(async () => {
    mongooseInstance = await createMongoInstance();
    await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
  });

  it('If user does not exist', async () => {
    const id1 = `id${nanoid().toLowerCase()}`;

    const response = await request(serverInstance.app).get(`/api/users/${id1}/verify`).expect(400);
    expect(response.body.message).toBe("Invalid link");
});

it('If user does exist', async () => {
    const user = await createTestUser();

    const response = await request(serverInstance.app).get(`/api/users/${user?._id}/verify`).expect(200);
    expect(user.verified).toBe(true);
    expect(response.body.message).toBe("Email verified successfully");
});

  
});