"use strict";

app.controller("EditEventCtrl", function ($scope, $location, EventFactory, $routeParams) {

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
  })
  .catch(() => console.error);

$scope.event = {};

$scope.title = "Edit Your Event";
$scope.btnText = "Update";
$scope.event.comments = "";

EventFactory.getSingleEventToEdit($routeParams.eventId)
  .then ( (event) => {
    $scope.event = event;
  });

$scope.saveEventToUserProfile = (event) => {
  EventFactory.updateEvent($routeParams.eventId, $scope.event)
    .then ( (response) => {
      $location.url("/myEvents");
    });
};


});
