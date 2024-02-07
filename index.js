<<<<<<< Updated upstream
const http = require('http');

const hostname = '127.0.0.1'; // the server will listen on this address
const port = 3000; // the server will listen on this port

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
=======
foobar
>>>>>>> Stashed changes
