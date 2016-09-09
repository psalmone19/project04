(function() {

 angular
  .module('chordChart')
  .controller("AboutController", AboutController)

  AboutController.$inject = ["$state"]

  function AboutController($state) {
    var vm = this;

    vm.goHome = goHome
    vm.image = "../images/elotegan.jpg"
    vm.about = "This web application was designed and developed by Egan Bernardino, using the MEAN stack. The idea stemmed from the desire to build something that my church band can use during our services. Although, it targets a specific community, I hope to have it available for use by and person or group of people."
    vm.contact = [

      "number: 213.446.2069",
      "email: eganpb19@gmail.com",
      "LinkedIn: https://www.linkedin.com/home?trk=nav_responsive_tab_home"

    ]

    function goHome() {
      $state.go("home")
    }

  }

})();
