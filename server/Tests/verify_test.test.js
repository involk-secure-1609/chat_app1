import { afterAll, beforeAll, describe, it, expect, vi } from "vitest";
import { createMongoInstance, disconnect } from "../Test_Helpers/db_instance";
import { closeTestServer, getTestServerInstance } from "../Test_Helpers/server_instance";
import { createTestUser, createTestUserWithValidation} from "../Test_Helpers/user_instance";
import { nanoid } from "nanoid";
import { verify } from "../API_calls/verify";
import request from 'supertest';

describe('API test for verification', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(verify);
  });

  afterAll(async () => {
    // mongooseInstance = await createMongoInstance();
    // await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
  });

  it('If user does not exist', async () => {
    const id1 = `id${nanoid().toLowerCase()}`;

    const response = await request(serverInstance.app).get(`/api/users/${id1}/verify/`).expect(500);
    expect(response.body.message).toBe("Internal Server Error" );
});

it('If user does exist', async () => {
    const user = await createTestUserWithValidation();

    const response = await request(serverInstance.app).get(`/api/users/${user._id}/verify/`).expect(200);
    expect(user.verified).toBe(true);
    expect(response.body.message).toBe("Email verified successfully");
});

  
});