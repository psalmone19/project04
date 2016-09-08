var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var roomController = require('../controllers/roomController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getTrack', function(req, res, next) {
  console.log("Request --->", req.query)
  var rootUrl = "http://api.musixmatch.com/ws/1.1/track.search?";
  var qTrack = "q_track="+req.query.track;
  var qArtist = "&q_artist="+req.query.artist;
  var hasLyrics = "&f_has_lyrics=1";
  var apikey = "&apikey="+process.env.API_KEY
  var reqUrl = rootUrl+qTrack+qArtist+hasLyrics+apikey;

  rp(reqUrl)
    .then(function(success) {
      success = JSON.parse(success)
      res.send({
        trackList: success.message.body
      })
    })
    .catch(function(err) {
      console.log(err)
      res.send(err)
    })

})

router.get('/getLyric', function(req, res, next) {
  var lyricUrl = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?"
  var trackid = "track_id="+req.query.track_id;
  var apikey = "&apikey="+process.env.API_KEY
  var newUrl= lyricUrl+trackid+apikey;

  rp(newUrl)
    .then(function (success) {
      success = JSON.parse(success)
      console.log(success.message.body.lyrics.lyrics_body)
      res.send({
        lyrics: success.message.body.lyrics.lyrics_body
      })
    })
    .catch(function(err) {
      console.log(err)

    })
})

router.post('/newRoom', roomController.roomCreate)
router.post('/getRoom', roomController.roomRead)
router.get('/allRooms', roomController.all)


module.exports = router;
