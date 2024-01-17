const { afterAll, beforeAll, describe, it, expect,vi} = require("vitest");
const {createMongoInstance,disconnect} = require("../Helpers/db_instance");
const {closeTestServer,getTestServerInstance} = require("../Helpers/server_instance");
const {createTestUser} = require("../Helpers/user_instance");
const {nanoid} = require("nanoid");
const {register} = require("../API_calls/register");
const request = require('supertest');
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
    mongooseInstance = await createMongoInstance();
    await disconnect(mongooseInstance);
    closeTestServer(serverInstance);
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
    expect(response.body).toBe('User already exists');
  });

  it('User send correct request', async () => {
    const mockRequest = {
      fullName: `fullName${nanoid().toLowerCase()}`,
      email: `email${nanoid().toLowerCase()}@example.com`,
      password: `password${nanoid().toLowerCase()}`,
    };
    vi.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      return 'hashed-password';
    });
    vi.spyOn(EmailSender, 'sendEmail').mockImplementationOnce(() => {
      return 'email-send';
    });
    
    const response = await request(serverInstance.app).post('/api/register').send(mockRequest).expect(250);
    expect(response.body).toBe('An Email has been sent to your account,please verify');
  });
});