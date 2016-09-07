(function() {

  angular
    .module("chordChart")
    .controller("SetupController", SetupController)

  SetupController.$inject = ['$http']

  function SetupController($http) {
    var vm = this;

    vm.data = ''
    vm.artist = ''
    vm.track = ''
    vm.debug = debug
    vm.getTrack = getTrack

    function debug() {
      // console.log("testing search", vm.search)
    }

    function getTrack() {
      $http.get('http://localhost:3000/getTrack?artist='+vm.artist+'&track='+vm.track)
      .then(function(data) {
        console.log(data)
        vm.data = data.data.trackList.track_list
      })
      .catch(function(err) {
        console.log(err)
      })
    }
  }

})();
