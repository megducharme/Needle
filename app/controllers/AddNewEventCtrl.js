"use strict";

app.controller("AddNewEventCtrl", function ($scope, EventFactory) {

let userId;
$scope.preferences = null;


$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
    console.log("should have go to showEvents by now");
  // console.log("need this userId13", userId);
  })
  .catch(() => console.error);


$scope.saveEventToUserProfile = () => {
  $scope.event;
  $scope.event.uid = userId;
  console.log("eventType", $scope.event);
};


});
