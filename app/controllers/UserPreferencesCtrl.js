"use strict";

app.controller("UserPreferencesCtrl", function ($scope, EventFactory, $location) {


$scope.checkboxModel = {
  value1:"",
  value2:"",
  value3:"",
  value4:"",
  value5:"",
  value6:"",
  value7:"",
  value8:"",
  value9:""
};

$scope.addPreferencesToObject = function () => {

  EventFactory.addPreferences();
}

});
