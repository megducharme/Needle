"use strict";

app.controller("UserEventsCtrl", function ($scope, EventFactory, $location) {

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
    console.log("which events are coming back!?", response);
    $scope.userEvents = response;
    console.log("scope user events", $scope.userEvents);
  });
}

$scope.removeEvent = (eventId) => {
  console.log("event id from FB", eventId);
  EventFactory.deleteUserEvent(eventId)
  .then ( (response) => {
    EventFactory.getUserEvents(userId)
    .then ( (response) => {
      $scope.userEvents = response;
    });
  });
};

});
