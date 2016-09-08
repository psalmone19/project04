(function() {

  angular
    .module("chordChart")
    .factory("GlobalService", GlobalService)

    function GlobalService() {
      var factory = {};

      factory.createdCode = ''
      return factory
    }


})();
