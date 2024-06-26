# CHAT_APP

This is just a standard Chat App I created so that i could learn how socket.io and WebRTC work.
It allows you to search for any user who is using the app and then you can choose to communicate with them.
The app also verifies your email using NodeMailer.

Apart from this i have also hosted the app using DOCKER and have also used Redis for caching Sockets which helps in improving the latency of the application.

# Tech-Stack Used

The required skills necessary are:

- [NODEJS](https://nodejs.org/en) 

- [EXPRESSJS](https://expressjs.com/)

- [TAILWIND CSS](https://tailwindcss.com/)

- [MONGO-DB](https://www.mongodb.com/)

- [REACT-JS](https://react.dev/)

- [SOCKET.IO](https://socket.io/)

- [WEBRTC](https://webrtc.org/)

- [REDIS](https://redis.io/)

# Design Of The Pages

**Login Page:**
![Screenshot from 2024-06-26 19-04-57](https://github.com/involk-secure-1609/chat_app1/assets/133996079/2e507f3d-eb4b-4271-a358-fcb081701718)

**Sign Up Page:**
![Screenshot from 2024-06-26 19-05-16](https://github.com/involk-secure-1609/chat_app1/assets/133996079/1f67d7f5-4e23-46fd-9569-919d64bcdf77)

**Chat Page:**
![Screenshot from 2024-06-26 19-13-26](https://github.com/involk-secure-1609/chat_app1/assets/133996079/fd65bdb9-c52d-4a1b-a0ae-60c9ce64a42d)

# Key Features
- After we enter our information and click Sign Up, and Email will be sent to the account we have given using the NodeJs module NodeMailer.
- We can then go to the Login Page and login,if our login attempt is succesfull then this page will popup:
 ![Screenshot from 2024-06-26 19-05-28](https://github.com/involk-secure-1609/chat_app1/assets/133996079/a9deafdd-d53f-460f-8494-3e761335d474)
- All the users who have an account can be searched for here:
  ![Screenshot from 2024-06-26 19-13-26](https://github.com/involk-secure-1609/chat_app1/assets/133996079/2fa7fa5f-ff1b-4b2d-90a5-eee51f4b6b05)
- On sending the first message to any user, the user will automatically be added to the Chats bar using Socket.Io.
- On clicking on any user in the Chat section the past messages will be visible in the middle of the screen:
  ![Screenshot from 2024-06-26 19-13-26](https://github.com/involk-secure-1609/chat_app1/assets/133996079/d35c3ec7-eaf2-403c-af3b-d7a349f91a0c)

