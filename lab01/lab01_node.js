/*
Run a node.js file on a command line via
localhost 127.0.0.1 without needing a html file.
*/

var http = require('http');

// Remeber: callback functions best written in arrow function syntax
http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end("Hello World! This server is up and running");
}).listen(8080);