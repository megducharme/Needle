"use strict";

app.controller("NSSCtrl", function($scope, $location, EventFactory) {

let beerOrCoffeeEvents = [];
$scope.finalItinerary = [];


$scope.beerMe = (beerOrCoffee) => {

  EventFactory.getEventsByType(beerOrCoffee)
    .then ( (events) => {
      console.log("events from call", events);
      for(var object in events){
        beerOrCoffeeEvents.push(events[object]);
      }
      let num = getRandom(0, (beerOrCoffeeEvents.length-1));
      let beerOrCoffeeResult = beerOrCoffeeEvents[num];
      console.log("beer or coffee result", beerOrCoffeeResult);
      $scope.finalItinerary.push(beerOrCoffeeResult);
      console.log("get beer or coffee here", $scope.finalItinerary);
    });
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

});
