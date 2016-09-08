var mongoose = require('mongoose')


var songSchema = new mongoose.Schema({
  title: String,
  lyrics: String
})

var roomSchema = new mongoose.Schema({
  roomCode: String,
  songs: [songSchema]
})

var Room = mongoose.model('Room', roomSchema)

module.exports = Room;
