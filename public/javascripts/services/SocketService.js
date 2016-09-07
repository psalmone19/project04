(function() {

  angular
    .module('chordChart')
    .factory("SocketService", SocketService)

    function SocketService() {
      var socket = io();
      return socket;
    }


})();
