"use strict";

app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location) {

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
  })
  .catch(() => console.error);



})
