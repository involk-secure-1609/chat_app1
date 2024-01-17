const { nanoid } = require("nanoid");
const  Users  = require('../Models/Users');

function createTestUser() {
  return Users.create({
    fullName: `fullName${nanoid().toLowerCase()}`,
    email: `email${nanoid().toLowerCase()}@example.com`,
    password: `password${nanoid().toLowerCase()}`,
    verified: false,
  });
}

// function createTestUserWithTokenValidation() {
//   return createTestUser().then((user) => {
//     const token = (Math.random() + 1).toString(36).substring(2, 5);
//     vi.spyOn(express.request, "header").mockReturnValueOnce(token);
//     vi.spyOn(jsonwt, "decode").mockImplementationOnce((...args) => {
//       return {
//         id: user._id._id.toString(),
//       };
//     });
//     return user;
//   });
// }

module.exports = {
  createTestUser,
  createTestUserWithTokenValidation,
};