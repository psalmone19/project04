(function() {

  angular
    .module("chordChart")
    .controller("HostController", HostController)

  HostController.$inject = []

  function HostController () {
    var vm = this;

    vm.song = {
      title: "How Great is Our God",
      sections: [
        {
          name: "Verse 1:",
          content:
            `The splendor of a king
            Clothed in majesty
            Let all the earth rejoice
            All the earth rejoice
            He wraps Himself in light,
            And darkness tries to hide
            And trembles at His voice
            Trembles at His voice`
        },
        {
          name: "Chorus:",
          content:
          `How great is our God
          Sing with me
          How great is our God
          And all will see
          How great, how great is our God`
        },
        {
          name: "Verse 2:",
          content:
          `Age to age He stands
          And time is in His hands
          Beginning and the end
          Beginning and the end
          The Godhead Three in One
          Father, Spirit, Son
          Lion and the Lamb
          Lion and the Lamb`
        },
        {
          name: "Bridge:",
          content:
          `Name above all names
          You are worthy of all praise
          And my heart will sing
          How great is our God`
        }
      ]
    }

    vm.title = vm.song.title
    var index = 0;
    vm.current = vm.song.sections[index]
    vm.next = vm.song.sections[index + 1]
    vm.nextFunc = next;
    vm.back = back;

    function next() {
      index++;
      vm.current = vm.song.sections[index]
      vm.next = vm.song.sections[index + 1]
    }

    function back() {
      index--;
      vm.current = vm.song.sections[index]
      vm.next = vm.song.sections[index - 1]
    }

  }


})();
