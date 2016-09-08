var io = require('socket.io')();
var rooms = [];
var Song = require('./models/song');

io.on('connection', function(socket) {
  // console.log('inside');
  socket.on('change-section', function($index) {
    console.log("received from sender")
      io.emit('change-section', $index);
  });

  // HOST
  socket.on('moveToSetup', function(room) {
    // controlled var to check states against.
    // $http.get('/allRooms')
    // .then(function(response) {
    //   console.log(response.data)
    // })
    Song.find({roomCode: room}, function(err, room) {
      if (room) {
        io.emit("roomExists");
      } else {
        rooms.push(room)
        // '.join' joins a room. parameter 'room' is whatever hosts inputs in field.
        socket.join(room)
        io.to(room).emit("redirectHost")
      }
    })
  })

  // JOIN
  socket.on('joinRoom', function(room) {
    socket.join(room)
    io.to(room).emit("justJoin")
  })

  socket.on("getSongList", function() {
    io.emit("songLists")
    console.log("I received connection")
  })
});


module.exports = io;
