#Chord Chart App

This app is tailored to make life easy for my church band by having a library of songs that we can have access to, which we can then utlitize for our church services. 

This code can be found in the HostController. These functions are responsible for the buttons on the host page to navigate through the sections of a song. A socket connection is established in this client side to communicate with the socket connection in the server. 

```js
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
```

The $index is a way to show which iteration of a loop you're in. It gives the index of the current iteration you're in. This is built in the angular directive "ng-repeat". $index is being passed in and manipualated in the functions above.
