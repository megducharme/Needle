"use strict";

app.controller("UserSelectionCtrl", function ($scope, EventFactory, $q) {

let userId;
$scope.preferences = null;


$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
    showEvents();
    console.log("should have go to showEvents by now");
  // console.log("need this userId13", userId);
  })
  .catch(() => console.error);


function showEvents() {
  EventFactory.getUserObject(userId)
    .then ( (user) => {
      console.log("this needs to be one user", user);
      for(var key in user){
        $scope.preferences = user[key].preferences;
      }
      console.log("$scope.preferences in the loop", $scope.preferences);
      getAllPreferredEvents();
    });
}

function getAllPreferredEvents() {
  var promises = [];
  for(var i = 0; i < $scope.preferences.length; i++) {
    var promise = EventFactory.getEventsByType($scope.preferences[i]);
    promises.push(promise);
  }
  console.log("promises", promises);
  $q.all(promises).then( (data) => {
    // console.log("data from promise", data);
    flattenObjects(data);
    //the data from the promises is going to be an array of arrays, so it needs to be flattened to be able to populate the DOM
  });
}

function flattenObjects(data) {
  $scope.eventsToDom = [];
  console.log("data to be flattened", data);
  data.forEach(function(object) {
    for (var singleObject in object){
      $scope.eventsToDom.push(object[singleObject]);
      console.log("object[singleObject]", object[singleObject]);
    }
  });
  console.log("array of objects to write to DOM", $scope.eventsToDom);
  // $scope.eventsToDom = data.reduce(function(a, b) {
  //   return a.concat(b);
  // });
}

$scope.saveEventToProfileVisited = (event) => {
  console.log("saving an event to profile event", event);
  event.type = "saved";
  event.visited = true;
  event.uid = userId;
  EventFactory.addEventToUserProfile(event)
    .then( (response) => {
      $scope.eventsVisited = response;
    });
};

$scope.saveEventToProfileNotVisited = (event) => {
  console.log("saving an event to profile event", event);
  event.type = "saved";
  event.visited = false;
  event.uid = userId;
  EventFactory.addEventToUserProfile(event)
    .then( (response) => {
      $scope.eventsNotVisited = response;
    });
};

});

