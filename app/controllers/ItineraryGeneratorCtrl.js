"use strict";

app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location, ItineraryFactory) {

$scope.userTime = null;
$scope.finalItinerary = null;
let userId;
let fewHours = [];
let halfDay = [];
let fullDay = [];
let visitedhalfDay = [];
let visitedfullDay = [];
let visitedfewHours = [];
let notVisitedhalfDay = [];
let notVisitedfullDay = [];
let notVisitedfewHours = [];


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
      console.log("few hours in promise, where to call filter function", fewHours);
      filterUserEventsVisited(fewHours, halfDay, fullDay);
    });
}

function filterUserEventsVisited (fewHours, halfDay, fullDay){
      for (var i = fewHours.length - 1; i >= 0; i--) {
        if(fewHours[i].visited === true){
          visitedfewHours.push(fewHours[i]);
        }else{
          notVisitedfewHours.push(fewHours[i]);
      }
      for (var m = halfDay.length - 1; m >= 0; i--) {
        if(halfDay[m].visited === true){
          visitedhalfDay.push(halfDay[m]);
        }else{
          notVisitedhalfDay.push(halfDay[i]);
      }
      for (var j = fullDay.length - 1; j >= 0; i--) {
        if(fullDay[j].visited === true){
          visitedfewHours.push(fullDay[j]);
        }else{
          notVisitedfullDay.push(fullDay[j]);
      }
      }
      }
      }
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
