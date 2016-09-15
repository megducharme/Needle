"use strict";

app.controller("UserPreferencesCtrl", function ($scope, EventFactory, $location) {

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    console.log("resolved")
    userId = user;
  console.log("need this userId", userId);
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

$scope.showPreferredEvents = () => {

  let values = [];
  let userObjectToEdit;
  let fbUserId;

  for(var value in $scope.checkboxModel) {
    if ($scope.checkboxModel[value]) {
    values.push(value);
    }
  }
    console.log("values", values);


  EventFactory.getUserObject(userId)
    .then ( (response) => {
      console.log("response from get user object function", response);
      for(var key in response){
        fbUserId = key;
        console.log("key in getuserobj", key);
        userObjectToEdit = response[key];
        console.log("response[key]",response[key]);
        userObjectToEdit.preferences = values;
        console.log("userObject.preferenes", values);
        }
  EventFactory.addPreferencesToUserObject(userObjectToEdit, fbUserId)
  .then ( () => {
    console.log("preferences added");
  })
    });


}

});
