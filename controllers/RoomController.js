var Room = require("../models/song.js")


//||||||||||||||||||||||||||--
// CREATE ROOM
//||||||||||||||||||||||||||--
var roomCreate = function(req, res) {
  var room = new Room(); // create a new instance of the Room model

  room.roomCode = req.body.roomCode
  room.songs = req.body.songs

  room.save(function(err, savedRoom) {
    if (err) {
      res.json(err)
    }
    else {
    res.json(savedRoom);
    }
  });
}

var roomRead = function(req, res) {
  Room.findOne({room: req.body.roomCode}, function(err, room) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(room);
    }
  });
}

module.exports = {
  roomCreate: roomCreate,
  roomRead: roomRead
}

