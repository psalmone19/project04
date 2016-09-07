var express = require('express');
var router = express.Router();
var rp = require('request-promise');

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
    .then(function (success) {
      success = JSON.parse(success)
      console.log(success.message.body)
      res.send({
        trackList: success.message.body
      })
    })
    .catch(function (err) {
      console.log(err)
      res.send(err)
    })

})

module.exports = router;
