(function() {
"use strict";

  angular
    .module("chordChart", ["ui.router"])
    .config(AppRoutes);

    AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

    function AppRoutes($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state("host", {
          url: "/host",
          controller: "HostController as host",
          templateUrl: "/templates/host.html"
        })
        .state("home", {
          url: "/home",
          controller: "HomeController as home",
          templateUrl: "/templates/home.html"
        })
        .state("setup", {
          url: "/setup",
          controller: "SetupController as setup",
          templateUrl: "/templates/setup.html"
        })


      $urlRouterProvider.otherwise("home");
    }






})();
