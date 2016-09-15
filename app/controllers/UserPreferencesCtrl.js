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
  for(var value in $scope.checkboxModel) {
    if ($scope.checkboxModel[value]) {
    values.push(value);
    }
  }
    console.log(values);

  EventFactory.getUserObject(userId)
    .then ( (response) => {
      console.log("response from get user object function", response);
      let userObject = response;
      userObject.prefereces = values;
      console.log("userObject.preferenes", values);
    });

  EventFactory.addPreferencesToUserObject(values);

  };
});
