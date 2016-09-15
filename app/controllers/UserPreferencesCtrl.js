"use strict";

app.controller("UserPreferencesCtrl", function ($scope, EventFactory, $location) {


$scope.showPreferredEvents = () => {

  $scope.checkboxModel = {
    coffee:true,
    waterfallHike:false,
    breweries:false,
    liveMusic:false,
    tours:true,
    placesToEat:true,
    cityParks:false,
    getDrinks:false,
    shopping:false,
  }

  let values = [];
  for(var value in $scope.checkboxModel) {
    if ($scope.checkboxModel[value]) {
    values.push(value);
    }
  }
    console.log(values);

};

});
