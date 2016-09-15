"use strict";

app.controller("UserAccountCtrl", function ($scope, EventFactory, $location) {

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    console.log("resolved")
    $scope.userObject.userId = user;
  })
  .catch(() => console.error);


$scope.userObject = {
  name:null,
  currentLocation:null
};

$scope.createUserProfile = () => {
  EventFactory.addUserProfile($scope.userObject);
  console.log("this is from the create user", $scope.userObject);
};

});
