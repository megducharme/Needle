"use strict";

app.controller("UserAccountCtrl", function ($scope, EventFactory, $location, UserFactory) {

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    // console.log("resolved");
    $scope.userObject.userId = user;
  })
  .catch(() => console.error);


$scope.userObject = {
  name:null,
  currentLocation:null,
  preferences:null
};

$scope.createUserProfile = () => {
  EventFactory.addUserProfile($scope.userObject)
  .then(()=>{
        $location.path("/preferences");
  // console.log("this is from the create user", $scope.userObject);
});
  UserFactory.setUserObj($scope.userObject)
};

});
