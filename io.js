var io = require('socket.io')();
var rooms = [];

io.on('connection', function(socket) {
  // console.log('inside');
  socket.on('change-section', function($index) {
    console.log("received from sender")
      io.emit('change-section', $index);
  });
  // HOST
  socket.on('getSongs', function(room) {
    var fail = false; // controlled var to check states against.
    rooms.forEach(function(session) {
      if (session === room) {
        io.emit("roomExists")
        fail = true;
      }
    })
    if (!fail) {
      rooms.push(room)
      // .join joins a room. parameter 'room' is whatever hosts inputs in field.
      socket.join(room)
      io.to(room).emit("redirectHost")
    }
  })

  // JOIN
  socket.on('joinRoom', function(room) {
    socket.join(room)
    io.to(room).emit("justJoin")
  })
});


module.exports = io;
