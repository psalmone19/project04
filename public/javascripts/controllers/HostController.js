(function() {

  angular
    .module("chordChart")
    .controller("HostController", HostController)

  HostController.$inject = ["$log", "$scope", "SocketService", "GlobalService", "$state", "$http"]

  function HostController ($log, $scope, socket, global, $state, $http) {
    var vm = this;
    var index = 0;

    // vm.title = vm.song.title
    // vm.current = vm.song.sections[index]
    // vm.next = vm.song.sections[index + 1]
    vm.nextFunc = next;
    vm.back = back;
    vm.sectionSelect = sectionSelect;
    vm.listOfSong;

    function next($index) {
      index++;
      vm.current = vm.song.sections[index]
      vm.next = vm.song.sections[index + 1]
      socket.emit('change-section', index)
    }

    function back($index) {
      index--;
      vm.current = vm.song.sections[index]
      vm.next = vm.song.sections[index - 1]
      socket.emit('change-section', index)
    }

    function sectionSelect($index) {
      index = $index;
      vm.current = vm.song.sections[index]
      vm.next = vm.song.sections[index + 1]
      // sender
      socket.emit('change-section', index)
      $log.log("Sent to server")
    }

    // receiver
    socket.on('connect', function() {
      socket.on('change-section', function($index) {
        index = $index;
        vm.current = vm.song.sections[index]
        vm.next = vm.song.sections[index + 1]
        $scope.$apply();
        $log.log("Received from sender")
      })
    })

    // socket.on('songLists', function(listOfSong) {
    //   $log.log("list of song ran")
    //   vm.listOfSong = listOfSong
    //   $scope.$apply()
    // })

    // socket.emit('getSongList')

    $http.post('/getRoom', {
      roomCode: global.createdCode
    })
    .then(function(response) {
      vm.listOfSong = response.data.songs
      $log.log(vm.listOfSong)
    })

  }

})();

// vm.song = {
//   title: "How Great is Our God",
//   sections: [
//     {
//       name: "\nVerse 1",
//       content:
//         `The splendor of a king
//         Clothed in majesty
//         Let all the earth rejoice
//         All the earth rejoice\n
//         He wraps Himself in light,
//         And darkness tries to hide
//         And trembles at His voice
//         Trembles at His voice`
//     },
//     {
//       name: "\nChorus",
//       content:
//       `How great is our God
//       Sing with me
//       How great is our God
//       And all will see
//       How great, how great is our God`
//     },
//     {
//       name: "\nVerse 2",
//       content:
//       `Age to age He stands
//       And time is in His hands
//       Beginning and the end
//       Beginning and the end\n
//       The Godhead Three in One
//       Father, Spirit, Son
//       Lion and the Lamb
//       Lion and the Lamb`
//     },
//     {
//       name: "\nBridge",
//       content:
//       `Name above all names
//       You are worthy of all praise
//       And my heart will sing
//       How great is our God`
//     }
//   ]
// }
