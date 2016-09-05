var io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('inside');
  socket.on('change-section', function($index) {
    console.log("received from sender")
      io.emit('change-section', $index);
  });
});


module.exports = io;
