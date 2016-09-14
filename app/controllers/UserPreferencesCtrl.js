"use strict";

app.controller("UserPreferencesCtrl", function ($scope, EventFactory, $location) {


$scope.checkboxModel = {
  coffee:false,
  waterfallHike:false,
  value3:false,
  value4:false,
  value5:false,
  value6:true,
  value7:false,
  value8:true,
  value9:false
}


values = [];

for(var value in $scope.checkboxModel) {
  if (value) {
  values.push(value);
  console.log(values);
  }
}


$scope.addPreferencesToObject = () => {
  EventFactory.addPreferences();
}

});
