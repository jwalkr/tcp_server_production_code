// socket io
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(process.env.PORT, function() {
  console.log('Socket IO Server is listening on port' + process.env.PORT);
});

function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if(err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  })
};

// waiting for connection
io.sockets.on('connection', function(socket) {
  console.log('connection...');
  socket.on('emit_from_client', function(data) {
    console.log('socket.io server received : '+data);
    
    io.sockets.emit('emit_from_server', data);
  });
});

// TCP server
var net = require('net');
var writable = require('fs').createWriteStream('test.txt');

net.createServer(function (socket) {
  console.log('socket connected');
  socket.on('data', function(data) {
    var line = data.toString();
    console.log('got "data"', line);
    socket.pipe(writable);
    io.sockets.emit('emit_from_server', line); // socket.io emit
  });
  socket.on('end', function() {
    console.log('end');
  });
  socket.on('close', function() {
    console.log('close');
  });
  socket.on('error', function(e) {
    console.log('error ', e);
  });
  socket.write('hello from tcp server');
}).listen(process.env.PORT, function() {
  console.log('TCP Server is listening on port' + process.env.PORT);
});