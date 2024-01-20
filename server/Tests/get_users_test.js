// const { afterAll, beforeAll, describe, it, expect,vi} = require("vitest");
// const {createMongoInstance,disconnect} = require("../Test_Helpers/db_instance");
// const {closeTestServer,getTestServerInstance} = require("../Test_Helpers/server_instance");
// const {createTestUser,createTestUserWithValidation} = require("../Test_Helpers/user_instance");
// const {nanoid} = require("nanoid");
// const {getusers} = require("../API_calls/get_users");
// const request = require('supertest');

import { afterAll, beforeAll, describe, it, expect, vi } from "vitest";
import { createMongoInstance, disconnect } from "../Test_Helpers/db_instance";
import { closeTestServer, getTestServerInstance } from "../Test_Helpers/server_instance";
import { createTestUser, createTestUserWithValidation } from "../Test_Helpers/user_instance";
import { nanoid } from "nanoid";
import { getusers } from "../API_calls/get_users";
import request from 'supertest';

describe('API test for getting New Users', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(getusers);
  });

  afterAll(async () => {
    // mongooseInstance = await createMongoInstance();
    // await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
  });

   it('If users list is empty', async () => {
    const user1=await createTestUserWithValidation();

    const response = await request(serverInstance.app).get(`/api/users/${user1._id}`).expect(200);
    const resData = await response.json();
    expect(resData).toBe([]);
  });

   it('If users list is not empty', async () => {
    const user1=await createTestUserWithValidation();
    const user2=await createTestUserWithValidation();
    const response = await request(serverInstance.app).get(`/api/users/${user1._id}`).expect(200);
    const resData = await response.json();
    const output=resData[0];
    expect(output.receiverId).toBe(user2._id);
    expect(output.fullName).toBe(user2.fullName);
    expect(output.email).toBe(user2.email);
  });
});