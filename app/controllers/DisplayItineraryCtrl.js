"use strict";

app.controller("DisplayItineraryCtrl", function ($scope, ItineraryFactory, $location) {

  function getInventoryForDom() {
    $scope.finalItinerary = ItineraryFactory.getFinalItinerary();
  }

  getInventoryForDom();

});
