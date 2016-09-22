"use strict";

app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location, ItineraryFactory) {

$scope.userTime = null;
$scope.finalItinerary = null;
let userId;
let halfDay = [];
let fullDay = [];
let fewHours = [];


$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
  filterUserEvents(userId);
  })
  .catch(() => console.error);


function filterUserEvents (userId){
  EventFactory.getUserEvents(userId)
    .then ( (events) => {
      console.log("user events", events);
      for (var i = events.length - 1; i >= 0; i--) {
        if(events[i].time === "halfDay"){
          halfDay.push(events[i]);
        }else if (events[i].time === "fewHours"){
          fewHours.push(events[i]);
        }else {
          fullDay.push(events[i]);
        }
      }
    });
}

$scope.generateItinerary = () => {

let userTime = $scope.userTime;
let options;
$scope.finalItinerary = [];
console.log("user time", userTime);


  switch(userTime) {
    // console.log("inside switch statement");
    case "fewHours":
      let num = getRandom(0, (fewHours.length-1));
      let fewHoursResult = fewHours[num];
      $scope.finalItinerary.push(fewHoursResult);
      break;

    case "halfDay":
      options = getRandom(0, 1);
        if(options === 0) {
          for (var i = 1; i >= 0; i--) {
            var fewHoursRandomHalfDay = getRandom(0, (fewHours.length-1));
            fewHours.splice(fewHoursRandomHalfDay, 1);
            $scope.finalItinerary.push(fewHours[fewHoursRandomHalfDay]);
          }
        }else {
          let num = getRandom(0, (halfDay.length-1));
          let halfDayResults = halfDay[num];
          $scope.finalItinerary.push(halfDayResults);
          }
      break;

    case "fullDay":
      options = getRandom(0, 2);
        if(options === 0) {
          let num = getRandom(0, (halfDay.length-1));
          let halfDayResult = halfDay[num];
          $scope.finalItinerary.push(halfDayResult);
            for (var m = 1; m >= 0; m--) {
              var fewHoursRandom = getRandom(0, (fewHours.length-1));
              $scope.finalItinerary.push(fewHours[fewHoursRandom]);
            }
        }else if(options === 1) {
              let halfDayToChooseFrom = halfDay;
            for (var j = 1; j >= 0; j--) {
              var halfDayRandom = getRandom(0, (halfDay.length-1));
              // halfDay.splice(halfDayRandom, 1);
              $scope.finalItinerary.push(halfDay[halfDayRandom]);
            }
        }else {
          let num = getRandom(0, (fullDay.length-1));
          let fullDayRandom = fullDay[num];
          $scope.finalItinerary.push(fullDay[num]);
        }
  }
      ItineraryFactory.setItinerary($scope.finalItinerary);
      console.log("final itinerary", $scope.finalItinerary);
      $location.url("/finalItinerary");
      // flattenItinerary(finalItinerary);
};


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


});
