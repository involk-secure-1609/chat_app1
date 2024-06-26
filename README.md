# CHAT_APP

This is just a standard Chat App I created so that i could learn how socket.io and WebRTC work.
It allows you to search for any user who is using the app and then you can choose to communicate with them.
The app also verifies your email using NodeMailer.

Apart from this I have also hosted the app using DOCKER and have also used Redis for caching Sockets which helps in improving the latency of the application.

# Tech-Stack Used

The required skills necessary are:

- [NODEJS](https://nodejs.org/en) :
  Node.js is used for backend development to create server-side applications, APIs, and web services.
- [EXPRESSJS](https://expressjs.com/)
  Express.js is a Node.js framework designed for building web applications and APIs.
- [TAILWIND CSS](https://tailwindcss.com/)
  A frontend framework which is used to design the UI of the application.
- [MONGO-DB](https://www.mongodb.com/)
  A NoSql database used for the storage of messages,chats and User Information.
- [REACT-JS](https://react.dev/)
  React.js is used for building interactive user interfaces in web applications.
- [SOCKET.IO](https://socket.io/)
  Enables real-time, bidirectional, and event-based communication between web clients and servers.
- [WEBRTC](https://webrtc.org/)
   WebRTC is designed to enable peer-to-peer communication and is widely used in applications for video conferencing, voice calls, and file sharing.
- [REDIS](https://redis.io/)
  Redis is an in-memory data structure store that can be used as a database, cache, and message broker. It is known for its high performance, flexibility and is used to cache SocketIds
  in our application.
- [Docker](https://www.docker.com/)
  Docker is a platform and tool designed to simplify the process of creating, deploying, and managing applications using containerization technology. 

# Design Of The Pages

**Login Page:**
![Screenshot from 2024-06-26 19-04-57](https://github.com/involk-secure-1609/chat_app1/assets/133996079/2e507f3d-eb4b-4271-a358-fcb081701718)

**Sign Up Page:**
![Screenshot from 2024-06-26 19-05-16](https://github.com/involk-secure-1609/chat_app1/assets/133996079/1f67d7f5-4e23-46fd-9569-919d64bcdf77)

**Chat Page:**
![Screenshot from 2024-06-26 19-13-26](https://github.com/involk-secure-1609/chat_app1/assets/133996079/fd65bdb9-c52d-4a1b-a0ae-60c9ce64a42d)

**Video Calling Page:**
![Screenshot from 2024-06-26 19-16-54](https://github.com/involk-secure-1609/chat_app1/assets/133996079/9790716e-9d36-4121-980d-e6767a2cf867)


# Key Features
- After we enter our information and click __Sign Up__, an Email will be sent to the account we have given using the NodeJs module __NodeMailer__.
- We can then go to the __Login Page__ and if our login attempt is successfull then this page will popup:
 ![Screenshot from 2024-06-26 19-05-28](https://github.com/involk-secure-1609/chat_app1/assets/133996079/a9deafdd-d53f-460f-8494-3e761335d474)
- All the users who have an account can be searched from the __Search User section__:
  ![Screenshot from 2024-06-26 19-13-26](https://github.com/involk-secure-1609/chat_app1/assets/133996079/2fa7fa5f-ff1b-4b2d-90a5-eee51f4b6b05)
- On sending the first message to any user, the user will automatically be added to the Chat section using __Socket.Io__.
- On clicking on any user in the Chat section the past messages will be visible in the middle of the screen:
  ![Screenshot from 2024-06-26 19-13-26](https://github.com/involk-secure-1609/chat_app1/assets/133996079/d35c3ec7-eaf2-403c-af3b-d7a349f91a0c)
- Video Calling can be triggered by clicking the __Call icon__ in the bar above the __Message Section__ :
- After clicking the call icon a __new Video Calling Page__ will open:
![Screenshot from 2024-06-26 19-16-54](https://github.com/involk-secure-1609/chat_app1/assets/133996079/4ed31002-7279-4531-abae-6e65550e6d59)
- In this page we can __generate a Room Id__ which has to be then forwarded to the user we want to talk to.
