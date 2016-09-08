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

//||||||||||||||||||||||||||--
// UPDATE ROOM
//||||||||||||||||||||||||||--
function roomUpdate(req, res, next) {
  var roomCode = req.query.code;
  console.log("Room code: ", roomCode);
  Room.find({roomCode: roomCode}, function(err, room) {
    if (err) {
      res.json(err);
    } else {
      console.log("this is the room: ", room);
      room[0].songs = req.body.songs;
      room[0].save(function(err, updatedRoom) {
        if (err) console.log(err);
        res.json(updatedRoom);
      })
    }
  })
}



module.exports = {
  roomCreate: roomCreate,
  roomRead: roomRead,
  all: all,
  roomUpdate: roomUpdate
}

