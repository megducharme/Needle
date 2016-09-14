"use strict";

app.controller("UserPreferencesCtrl", function ($scope, EventFactory, $location) {


$scope.showPreferredEvents = () => {

  $scope.checkboxModel = {
    coffee:false,
    waterfallHike:false,
    breweries:false,
    liveMusic:false,
    tours:false,
    placesToEat:false,
    cityParks:false,
    getDrinks:false,
    shopping:false,
  }

  values = [];
  for(var value in $scope.checkboxModel) {
    if (value) {
    values.push(value);
    console.log(values);
    }
  }

};

});
