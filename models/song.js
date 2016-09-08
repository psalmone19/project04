var mongoose = require('mongoose')


var songSchema = new mongoose.Schema({
  title: String,
  lyrics: String
})

var roomSchema = new mongoose.Schema({
  roomCode: {type: String, required: true, unique: true},
  songs: [songSchema]
})

var Room = mongoose.model('Room', roomSchema)

module.exports = Room;
