import { afterAll, beforeAll, describe, it, expect, vi } from "vitest";
import { createMongoInstance, disconnect } from "../Test_Helpers/db_instance";
import { closeTestServer, getTestServerInstance } from "../Test_Helpers/server_instance";
import { createTestUser } from "../Test_Helpers/user_instance";
import { nanoid } from "nanoid";
import { register } from "../API_calls/register";
import request from 'supertest';
import EmailSender from '../EmailVerification/sendEmail';

describe('API test for Creating New Account', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(register);
  });

  afterAll(async () => {
    // mongooseInstance = await createMongoInstance();
    // await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
  });

   it('If fullName is empty', async () => {
    const mockRequest = {
      fullName: '',
      email:`email${nanoid().toLowerCase()}`,
      password: `password${nanoid().toLowerCase()}`,
      verified: false,
    };
    const response = await request(serverInstance.app).post('/api/register').send(mockRequest).expect(400);
    expect(response.body.msg).toBe('Please fill all required fields');
  });

  it('If password is empty', async () => {
    const mockRequest = {
      fullName: `fullName${nanoid().toLowerCase()}`,
      email:`email${nanoid().toLowerCase()}`,
      password: '',
      verified: false,
    };
    const response = await request(serverInstance.app).post('/api/register').send(mockRequest).expect(400);
    expect(response.body.msg).toBe('Please fill all required fields');
  });

  it('If email is empty', async () => {
    const mockRequest = {
      fullName: `fullName${nanoid().toLowerCase()}`,
      email:'',
      password: `password${nanoid().toLowerCase()}`,
      verified: false,
    };
    const response = await request(serverInstance.app).post('/api/register').send(mockRequest).expect(400);
    expect(response.body.msg).toBe('Please fill all required fields');
  });

   it('If user with same email address try to create account', async () => {
    const user = await createTestUser();
    const mockRequest = {
      fullName: `fullName${nanoid().toLowerCase()}`,
      email: user.email,
      password: `password${nanoid().toLowerCase()}`,
      verified: false,
    };
    const response = await request(serverInstance.app).post('/api/register').send(mockRequest).expect(400);
    expect(response.body.msg).toBe('User already exists');
  });
   

  it('User send correct request', async () => {
    const mockRequest = {
      fullName: `fullName${nanoid().toLowerCase()}`,
      email: `email${nanoid().toLowerCase()}@example.com`,
      password: `password${nanoid().toLowerCase()}`,
    };

    const response = await request(serverInstance.app).post('/api/register').send(mockRequest).expect(200);
    // vi.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
    //   return 'hashed-password';
    // });
    // vi.spyOn(EmailSender, 'sendEmail').mockImplementationOnce(() => {
    //   return 'emai-sed';
    // });
    
    expect(response.body.msg).toBe('An Email has been sent to your account,please verify');
  });
});