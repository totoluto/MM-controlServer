require('dotenv').config({path: __dirname + '/.env'});

const http = require('http');
const { createApp } = require('./api');
const { setupSocketIo } = require('./socket');

function startServer(server, port) {
  server.listen(port, function() {
    console.log(`Server is running on port ${port}`);
  });
}

function createServer(app) {
  return http.createServer(app);
}

// Main function
function main() {
  const PORT = process.env.PORT || 3000;
  const app = createApp();
  const server = createServer(app);
  setupSocketIo(server);
  startServer(server, PORT);
}

main();