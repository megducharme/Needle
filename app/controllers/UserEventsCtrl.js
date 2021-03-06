"use strict";

app.controller("UserEventsCtrl", function ($scope, EventFactory, $location, UserFactory) {

let userId;
$scope.userName;

getUserName();

function getUserName() {
    $scope.userName = UserFactory.getUserObj()
}

$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
    showUserEvents(userId);
  })
  .catch(() => console.error);

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
