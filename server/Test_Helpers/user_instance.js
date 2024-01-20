import { nanoid } from "nanoid";
const Users = require("../Models/Users");

function createTestUser() {
  return Users.create({
    fullName: `fullName${nanoid().toLowerCase()}`,
    email: `email${nanoid().toLowerCase()}@example.com`,
    password: `password${nanoid().toLowerCase()}`,
    verified: false,
  });
}

function createTestUserWithValidation() {
  return Users.create({
    fullName: `fullName${nanoid().toLowerCase()}`,
    email: `email${nanoid().toLowerCase()}@example.com`,
    password: `password${nanoid().toLowerCase()}`,
    verified: true,
  });
}

module.exports = {
  createTestUser,
  createTestUserWithValidation,
};
