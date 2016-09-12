(function () {

  angular
    .module("chordChart")
    .controller("HomeController", HomeController)

  HomeController.$inject = ["$log", "$state", "$http", "SocketService", "GlobalService", "$scope"]

  function HomeController($log, $state, $http, socket, global, $scope) {
    var vm = this;
    var hostIs = false;

    vm.error = ''
    vm.code = ''
    vm.codeToJoin = ''
    vm.createdCode = ''
    vm.jointoggle = false
    vm.hosttoggle = false
    vm.host = host
    vm.join = join

    function host() {
      $http.post("/api/rooms", { roomCode: vm.createdCode })
        .then(function(response) {
          socket.emit("moveToSetup", vm.createdCode)
          hostIs = true;
          $log.log("you're a host", vm.createdCode)
          global.createdCode = vm.createdCode;
        }, function(err) {
          $log.warn(err);
        })
    }

    socket.on("redirectHost", function() {
        $state.go('setup');
    })
    socket.on("roomExists", function() {
        $log.log("wanna go night night?")
        vm.error = "Knock somewhere else."
        $scope.$apply();
    })

    function join() {
        $log.log("joined", vm.codeToJoin);
        socket.emit("joinRoom", vm.codeToJoin)
    }

    socket.on("justJoin", function() {
      if (!hostIs) {
        global.createdCode = vm.codeToJoin;
        $state.go("host");
      }
    })
  }


})();





    // function generateCode() {
    //   var code = "";
    //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //   for( var i=0; i < 5; i++ )
    //     code += possible.charAt(Math.floor(Math.random() * possible.length));

    //   vm.hosttoggle = true;
    //   vm.code = code
    //   return code;
    // }
