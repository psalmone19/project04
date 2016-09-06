(function () {

  angular
    .module("chordChart")
    .controller("HomeController", HomeController)

  HomeController.$inject = ["$log", "$state"]

  function HomeController($log, $state) {
    var vm = this;

    vm.join = false;
    vm.host = false;

    function join() {
      $state.go("view")
    }

    function host() {
      $state.go("create")
    }

  }


})();
