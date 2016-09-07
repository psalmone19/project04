(function () {

  angular
    .module("chordChart")
    .controller("HomeController", HomeController)

  HomeController.$inject = ["$log", "$state", "SocketService", "$scope"]

  function HomeController($log, $state, socket, $scope) {
    var vm = this;
    var hostIs = false;

    vm.error = ''
    vm.code = ''
    vm.createdCode = ''
    vm.jointoggle = false
    vm.hosttoggle = false
    vm.host = host
    vm.join = join

    function host() {
        socket.emit("getSongs", vm.createdCode)
        hostIs = true;
        console.log("you're a host")
    }
    socket.on("redirectHost", function() {
        $state.go('setup');
    })
    socket.on("roomExists", function() {
        console.log("wanna go night night nigguh?")
        vm.error = "This room taken nigguh. black lives matter nigguh."
        $scope.$apply();
    })

    function join() {
        console.log("you just joined")
        socket.emit("joinRoom", vm.createdCode)
    }
    socket.on("justJoin", function() {
        if (!hostIs)
            $state.go("host");
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
