const express = require("express");
const http = require("http");

function getTestServerInstance() {
  try {
    const app = express();
    app.use(express.json());
    const server = http.createServer(app);
    server.listen();
    return {
      app: app,
      server: server,
    };
  } catch (e) {
    console.log("Error in main test server" + e.toString());
    return null;
  }
}

function closeTestServer(server) {
  server.server.close((err) => {
    if (err) {
      console.log(err.toString());
    }
  });
}

module.exports = {
  getTestServerInstance,
  closeTestServer,
};

// Define the ServerProperties interface separately, if needed
function ServerProperties(app, server) {
  this.app = app;
  this.server = server;
}