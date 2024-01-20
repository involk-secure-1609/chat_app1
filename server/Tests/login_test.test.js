import { afterAll, beforeAll, describe, it, expect, vi } from "vitest";
import { createMongoInstance, disconnect } from "../Test_Helpers/db_instance";
import { closeTestServer, getTestServerInstance } from "../Test_Helpers/server_instance";
import { createTestUser, createTestUserWithValidation } from "../Test_Helpers/user_instance";
import { nanoid } from "nanoid";
import { login } from "../API_calls/login";
import request from 'supertest';
import EmailSender from '../EmailVerification/sendEmail';
import { jwt } from "jsonwebtoken";
describe('API test for logging in ', () => {
  let mongooseInstance;
  let serverInstance;

  beforeAll(async () => {
    mongooseInstance = await createMongoInstance();
    serverInstance = getTestServerInstance();
    serverInstance.app.use(login);
  });

  afterAll(async () => {
    // mongooseInstance = await createMongoInstance();
    // await disconnect(mongooseInstance);
      closeTestServer(serverInstance);
  });

  it('If password is empty', async () => {
    const mockRequest = {
      email:`email${nanoid().toLowerCase()}`,
      password: '',
    };
    const response = await request(serverInstance.app).post('/api/login').send(mockRequest).expect(400);
    expect(response.body.msg).toBe('Please fill all required fields');
  });

  it('If email is empty', async () => {
    const mockRequest = {
      email:'',
      password: `password${nanoid().toLowerCase()}`,
    };
    const response = await request(serverInstance.app).post('/api/login').send(mockRequest).expect(400);
    // const resData=await response.json();
    expect(response.body.msg).toBe('Please fill all required fields');
  });

   it('If user does not exist', async () => {
    const mockRequest = {
      email: `email${nanoid().toLowerCase()}`,
      password: `password${nanoid().toLowerCase()}`,
    };
    const response = await request(serverInstance.app).post('/api/login').send(mockRequest).expect(400);
    // const resData=await response.json();
    expect(response.body.msg).toBe("User does not exist,please create an account");
  });

  it('If user is not verified yet', async () => {
    const user = await createTestUser();
    const mockRequest = {
      email: user.email,
      password: user.password,
    };

        const response = await request(serverInstance.app).post('/api/login').send(mockRequest).expect(400);
    //    vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
    //   return 'comparison-success';
    // });

    // vi.spyOn(EmailSender, 'sendEmail').mockImplementationOnce(() => {
    //   return 'email-sent';
    // });
    //  const resData=await response.json();
    expect(response.body.msg).toBe("User email or password is incorrect");
    expect(response.body.loggedIn).toBe(false);
  });


  it('If User is verified', async () => {
    const user = await createTestUserWithValidation();
     const mockRequest = {
      email: user.email,
      password: user.password,
    };
    // vi.spyOn(jwt, 'sign').mockImplementationOnce(() => {
    //   return 'jwt-token ';
    // });
    
    const response = await request(serverInstance.app).post('/api/login').send(mockRequest).expect(200);
    //  const resData=await response.json();
    expect(response.body.user.email).toBe(user.email);
    // expect(response.body.password).toBe(user.password);
  });
});