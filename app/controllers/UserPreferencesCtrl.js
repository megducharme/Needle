"use strict";

app.controller("UserPreferencesCtrl", function ($scope, EventFactory, $location) {

console.log("UserPreferencesCtrl is working");

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    console.log("resolved");
    userId = user;
    // $scope.showPreferredEvents();
  // console.log("need this userId", userId);
  })
  .catch(() => console.error);

  $scope.checkboxModel = {
    coffee:false,
    waterfallHike:false,
    breweries:false,
    liveMusic:false,
    tours:false,
    placesToEat:false,
    cityParks:false,
    getDrinks:false,
    shopping:false
  };

  let values = [];
$scope.showPreferredEvents = () => {
  for(var value in $scope.checkboxModel) {
    if ($scope.checkboxModel[value]) {
    values.push(value);
    }
  }
  getUserObjFromFB();
    console.log("values array", values);
};

function getUserObjFromFB() {
  let userObjectToEdit;
  let fbUserId;
  EventFactory.getUserObject(userId)
    .then ( (response) => {
      console.log("response", response);
      for(var key in response){
        fbUserId = key;
        userObjectToEdit = response[key];
        userObjectToEdit.preferences = values;
        }
  EventFactory.addPreferencesToUserObject(userObjectToEdit, fbUserId);
  });
}

$scope.goToSelections = function() {
        $location.path("/selections");
    };


});
