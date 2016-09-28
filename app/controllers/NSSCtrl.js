"use strict";

app.controller("NSSCtrl", function($scope, $location, EventFactory) {

let beerEvents = [];
$scope.finalItinerary = [];


$scope.beerMe = () => {

  EventFactory.getEventsByType("nss")
    .then ( (events) => {
      console.log("events from call", events);
      for(var object in events){
        beerEvents.push(events[object])
      }
      let num = getRandom(0, (beerEvents.length-1))
      let beerResult = beerEvents[num];
      console.log("beer result", beerResult);
      $scope.finalItinerary.push(beerResult);
      console.log("get beer here", $scope.finalItinerary);
    });
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

});
