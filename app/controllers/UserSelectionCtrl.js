"use strict";

app.controller("UserSelectionCtrl", function ($scope, EventFactory, $q) {

console.log("USER SELECTION LOADED");

let userId;

$scope.$parent.getUser()
.then ( (user) => {
  userId = user;
  showEvents();
  console.log("should have go to showEvents by now");
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
    flattenObjects(data);
  });
}


function flattenObjects(data) {
  let preferences = {}
  console.log(data)
  data.forEach(obj => {
    let preferencesKey = obj[Object.keys(obj)[0]].type
    preferences[preferencesKey] = []
    for(let key in obj){
      let preferenceKey = obj[key].type
      preferences[preferencesKey].push(obj[key])
      console.log(preferences)
    }
  })
    buildObjectsForDom(preferences);
}


function buildObjectsForDom(preferences) {
  $scope.objectsForDOM = [];

  for(let key in preferences){
    $scope.objectsForDOM.push({
      eventType: key,
      events: preferences[key]
    })
  }
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
