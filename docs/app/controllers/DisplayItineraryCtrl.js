"use strict";

app.controller("DisplayItineraryCtrl", function ($scope, ItineraryFactory, $location) {

getInventoryForDom();

function getInventoryForDom() {
  $scope.finalItinerary = ItineraryFactory.getFinalItinerary();
}

});
