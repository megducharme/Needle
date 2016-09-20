"use strict";

app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location) {

$scope.userTime = null;
let userId;
let halfDay = [];
let fullDay = [];
let fewHours = [];


$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
  })
  .catch(() => console.error);


$scope.getAllEvents = () => {
  EventFactory.getTimeAllottedEvents("halfDay")
    .then( (events) => {
      for(var event in events){
        halfDay.push(event);
      }
    });

  EventFactory.getTimeAllottedEvents("fullDay")
    .then ( ( events) => {
      for(var event in events){
        fullDay.push(event);
      }
    });

  EventFactory.getTimeAllottedEvents("fewHours")
    .then ( (events) => {
      for(var event in events){
        fewHours.push(event);
      }
    });
  generateItinerary();
};


function generateItinerary (){
let userTime = $scope.userTime;
let options;
console.log("user time", userTime);

  switch(userTime) {
    // console.log("inside switch statement");
    case "fewHours":
      let num = getRandom(fewHours.length);
      console.log("random number for few hour case", num);
      let fewHoursResult = fewHours[num];
      console.log("one event for few hours", fewHoursResult);
      console.log("fewHours array", fewHours);
      break;

    case "halfDay":
      options = getRandom(1);
      let halfDayResult = [];
        if(options === 0) {
          for (var i = options; i >= 0; i--) {
            var fewHoursRandom = getRandom(fewHours.length);
            fewHours.splice[fewHours[fewHoursRandom], 1];
            halfDayResult.push(fewHours[fewHoursRandom]);
          }
        }else {
          let num = getRandom(halfDay.length);
          let halfDayResults = halfDay[num];
          halfDayResult.push(halfDayResults)
          }
      break;

    case "fullDay":
      options = getRandom(2);
      let fullDayResult = [];
        if(options === 0) {
          let num = getRandom(halfDay.length);
          let halfDayResult = halfDay[num];
          fullDayResult.push(halfDay[num]);
            for (var i = options; i >= 0; i--) {
              var fewHoursRandom = getRandom(fewHours.length);
              fewHours.splice[fewHours[fewHoursRandom], 1];
              fullDayResult.push(fewHours[fewHoursRandom]);
            }
        }else if(options === 1) {
            for (var j = options; j >= 0; j--) {
              var fewHoursRandom = getRandom(fewHours.length);
              fewHours.splice[fewHours[fewHoursRandom], 1];
              fullDayResult.push(fewHours[fewHoursRandom]);
            }
        }else {
          let num = getRandom(fullDay.length);
          let fullDayRandom = fullDay[num];
          fullDayResult.push(fullDay[num]);
        }
  }
};

function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}


});
