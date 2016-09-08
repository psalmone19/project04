(function() {

  angular
    .module("chordChart")
    .controller("SetupController", SetupController)

  SetupController.$inject = ["$log", "$http", "GlobalService", "SocketService", "$state"]

  function SetupController($log, $http, global, socket, $state) {
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
      $http.get('/api/tracks?artist='+vm.artist+'&track='+vm.track)
      .then(function(response) {
        vm.data = response.data.trackList.track_list
      })
      .catch(function(err) {
        $log.log(err)
      })
    }

    function select(song) {
      $http.get('/api/lyrics?track_id='+song.track.track_id)
      .then(function(response) {
        vm.lyrics = response.data.lyrics
        vm.mySongs.push({
          title: song.track.track_name,
          lyrics: vm.lyrics
        })
        $log.log(vm.lyrics)
      })
      .catch(function(err) {
        $log.log(err)
      })
    }

    function done() {
      // sending a post request to database
      // this will go to index.js(route) and then to the actual function
      $http.put('/api/rooms?code=' + global.createdCode, {
        songs: vm.mySongs
      })
      .then(function(response) {
        // $log.log(response.data)
        $state.go('host')
      })
    }
  }

})();
