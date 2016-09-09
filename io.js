var io = require('socket.io')();
var rooms = [];
var Room = require('./app/models/song');

function updateRooms() {
  Room.find({}, function(err, rooms) {
    if (err) console.log(err);
    rooms = rooms.map(priv => priv.roomCode);
    console.log(rooms);
  });
};

updateRooms();

io.on('connection', function(socket) {
  // console.log('inside');
  socket.on('change-section', function($index) {
    console.log("received from sender")
      io.emit('change-section', $index);
  });

  // HOST
  socket.on('moveToSetup', function(room) {
    var fail = false; // controlled var to check states against.
    // $http.get('/allRooms')
    // .then(function(response) {
    //   console.log(response.data)
    // })
    rooms.forEach(function(session) {
      if (session === room) {
        io.emit("roomExists")
        fail = true;
      }
    })
    if (!fail) {
      rooms.push(room)
      // '.join' joins a room. parameter 'room' is whatever hosts inputs in field.
      socket.join(room)
      io.to(room).emit("redirectHost")
    }
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

  // socket.on("gotSongs", function() {
  //   io.emit("songs")
  // })
});


module.exports = io;
