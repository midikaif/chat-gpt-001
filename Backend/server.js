require('dotenv').config();
const initSocketServer = require('./src/sockets/socket.server');
const app = require("./src/app");
const connectDB = require("./src/db/db");
const httpServer = require('http').createServer(app);


connectDB();
initSocketServer(httpServer);


httpServer.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
