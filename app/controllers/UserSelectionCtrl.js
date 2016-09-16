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
      console.log("user from show events function", user);
      for(var key in user){
        $scope.preferences = user[key].preferences;
        console.log("$scope.preferences", $scope.preferences);
      }
  getAllPreferredEvents();
    });
}

function getAllPreferredEvents() {
  var promises = [];
  for(var i = 0; i < $scope.preferences.length; i++) {
    var promise = EventFactory.getSingleEvent($scope.preferences[i]);
    promises.push(promise);
  }
  console.log("promises", promises);
  $q.all(promises).then( (data) => {
    console.log("data from promise", data);
    flattenArray(data);
    //the data from the promises is going to be an array of arrays, so it needs to be flattened to be able to populate the DOM
  });
}

function flattenArray(data) {
  $scope.eventsToDom = data.reduce(function(a, b) {
    return a.concat(b);
  });
  console.log("single events", $scope.eventsToDom);
}

});

