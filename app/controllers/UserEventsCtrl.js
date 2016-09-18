"use strict";

app.controller("UserEventsCtrl", function ($scope, EventFactory) {

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
    showUserEvents(userId);
  })
  .catch(() => console.error);

$scope.userEvents;

function showUserEvents (userId){
  console.log("userId in show user events", userId);
  EventFactory.getUserEvents(userId)
  .then ( (response) => {
    console.log("response", response);
    $scope.userEvents = response;
    console.log("scope user events", $scope.userEvents);
  });
}

$scope.removeEvent = (eventId) => {
  EventFactory.deleteUserEvent(eventId);
}

});
