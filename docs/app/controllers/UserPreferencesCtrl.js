"use strict";

app.controller("UserPreferencesCtrl", function ($scope, EventFactory, $location, UserFactory) {

console.log("UserPreferencesCtrl is working");

let userId;
let values = [];
let userObjectToEdit;
let fbUserId;
$scope.userName;

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
    waterfallHikes:false,
    breweries:false,
    liveMusic:false,
    tours:false,
    restaurants:false,
    cityParks:false,
    getDrinks:false,
    shopping:false
  };

getUserName();

function getUserName() {
    $scope.userName = UserFactory.getUserObj()
}


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
