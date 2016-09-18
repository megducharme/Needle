"use strict";

app.controller("UserPreferencesCtrl", function ($scope, EventFactory, $location) {

console.log("UserPreferencesCtrl is working");

let userId;
let values = [];
let userObjectToEdit;
let fbUserId;

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
    restaurants:false,
    cityParks:false,
    getDrinks:false,
    shopping:false
  };

$scope.showPreferredEvents = () => {
  for(var value in $scope.checkboxModel) {
    if ($scope.checkboxModel[value]) {
    values.push(value);
    }
  }
  EventFactory.getUserObject(userId)
    .then ( (response) => {
      console.log("response", response);
      // return $q()
      for(var key in response){
        fbUserId = key;
        userObjectToEdit = response[key];
        userObjectToEdit.preferences = values;
        }
      EventFactory.addPreferencesToUserObject(userObjectToEdit, fbUserId)
      .then(()=>{
        $location.path("/selections");
      });
  });
    console.log("values array", values);
};

});
