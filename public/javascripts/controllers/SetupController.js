(function() {

  angular
    .module("chordChart")
    .controller("SetupController", SetupController)

  SetupController.$inject = ['$http', "GlobalService", "SocketService", "$state"]

  function SetupController($http, global, socket, $state) {
    var vm = this;

    vm.lyrics = ''
    vm.data = ''
    vm.artist = ''
    vm.track = ''
    vm.getTrack = getTrack
    vm.select = select
    vm.debug = debug
    vm.done = done
    vm.mySongs = [];

    function debug() {
      // console.log("testing search", vm.search)
    }

    function getTrack() {
      $http.get('/getTrack?artist='+vm.artist+'&track='+vm.track)
      .then(function(response) {
        vm.data = response.data.trackList.track_list
      })
      .catch(function(err) {
        console.log(err)
      })
    }

    function select(song) {
      $http.get('/getLyric?track_id='+song.track.track_id)
      .then(function(response) {
        vm.lyrics = response.data.lyrics
        vm.mySongs.push({
          title: song.track.track_name,
          lyrics: vm.lyrics
        })
        console.log(vm.lyrics)
      })
      .catch(function(err) {
        console.log(err)
      })
    }

    function done() {
      // sending array of songs and room to io.js
      $http.post('/newRoom', {
        roomCode: global.createdCode,
        songs: vm.mySongs
      }).then(function(response) {
        console.log(response.data)
        $state.go('host')
      })
    }
  }

})();
