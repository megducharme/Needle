"use strict";

app.controller("AddNewEventCtrl", function ($scope, EventFactory, $location) {

let userId;
$scope.preferences = null;


$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
    console.log("should have go to showEvents by now");
  // console.log("need this userId13", userId);
  })
  .catch(() => console.error);


$scope.saveEventToUserProfile = (event) => {
  $scope.event;
  $scope.event.uid = userId;
  $scope.event.photo = "http://www.aal-europe.eu/wp-content/uploads/2013/12/events_medium.jpg";
  if($scope.event.visited === "true"){
    $scope.event.visited = true
  } else {
    $scope.event.visited = false
  }
  EventFactory.addEventToUserProfile(event)
  .then ( (response) => {
    $location.url("/myEvents");
  });
  console.log("eventType", $scope.event);
};

});
