(function () {

  angular
    .module("chordChart")
    .controller("HomeController", HomeController)

  HomeController.$inject = ["$log", "$state", "SocketService", "GlobalService", "$scope"]

  function HomeController($log, $state, socket, global, $scope) {
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
        socket.emit("moveToSetup", vm.createdCode)
        hostIs = true;
        console.log("you're a host", vm.createdCode)
        global.createdCode = vm.createdCode
    }

    socket.on("redirectHost", function() {
        $state.go('setup');
    })
    socket.on("roomExists", function() {
        console.log("wanna go night night?")
        vm.error = "Knock somewhere else."
        $scope.$apply();
    })

    function join() {
        console.log("joined", vm.codeToJoin)
        socket.emit("joinRoom", vm.codeToJoin)
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
