"use strict";

app.controller("UserSelectionCtrl", function ($scope, EventFactory) {

let userId;

let showEvents = () => {
  console.log("HELLO from the showEvents function!");

  $scope.preferences = null;
  EventFactory.getUserObject(userId)
    .then ( (user) => {
      // console.log("user from show events function", user);
      for(var key in user){
      $scope.preferences = user[key].preferences;
      console.log("$scope.preferences", $scope.preferences);
      }
      getOneEventFromArray();
    });

  function getOneEventFromArray() {
      $scope.events = [];
    for (var i = 0; i < $scope.preferences.length; i++) {
      console.log("scope preferences length", $scope.preferences.length);
    EventFactory.getSingleEvent($scope.preferences[i])
    .then ( (eventObject) => {
      $scope.events.push(eventObject);
    });
      console.log("single event object", $scope.events);
    }
  }
};


  $scope.$parent.getUser()
    .then ( (user) => {
      userId = user;
      showEvents();
      console.log("should have go to showEvents by now");
    // console.log("need this userId13", userId);
    })
    .catch(() => console.error);

// console.log("13", userId);


});

