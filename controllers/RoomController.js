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


//||||||||||||||||||||||||||--
// GET ROOM
//||||||||||||||||||||||||||--
var roomRead = function(req, res) {
  console.log(req.body.roomCode)
  Room.findOne({roomCode: req.body.roomCode}, function(err, room) {
    if (err) {
      res.json(err);
    }
    else {
      console.log(room);
      res.json(room);
    }
  });
}

var all = function(req, res) {
  Room.find({}, function(err, rooms) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rooms);
    }
  })
}

module.exports = {
  roomCreate: roomCreate,
  roomRead: roomRead,
  all: all
}

