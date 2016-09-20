"use strict";

app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location) {

let userId;
let halfDay = [];
let fullDay = [];
let fewHours = [];
let userTime = $scope.userTime;


$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
  })
  .catch(() => console.error);


$scope.getAllEvents = () => {
  EventFactory.getTimeAllottedEvents(halfDay)
    .then( (events) => {
      halfDay = events;
    });

  EventFactory.getTimeAllottedEvents(fullDay)
    .then ( ( events) => {
      fullDay = events;
    });

  EventFactory.getTimeAllottedEvents(fewHours)
    .then ( (events) => {
      fewHours = events;
    });

  generateItinerary();

console.log("halfday", halfDay);
console.log("fullDay", fullDay);
console.log("fewHours", fewHours);
};


$scope.generateItinerary = (userTime) => {
console.log("user time", userTime);
  switch(userTime) {

    case "fewHours":
      let num = getRandom(fewHours.length);
      let fewHoursResult = fewHours[num];
      break;

    case "halfDay":
      let option = getRandom(1);
      let halfDayResult = [];
        if(option === 0) {
          for (var i = option; i >= 0; i--) {
            var fewHoursRandom = getRandom(fewHours.length);
            fewHours.splice[fewHoursRandom, 1];
            halfDayResult.push(fewHours[fewHoursRandom]);
          }
        } else {
          let num = getRandom(halfDay.length);
          let halfDayResult = halfDay[num];
          halfDayResult.push(halfDayResult)
          }
      break;

    case "fullDay":
      let option = getRandom(2);
      let fullDayResult = [];
        if(option === 0) {
          let num = getRandom(halfDay.length);
          let halfDayResult = halfDay[num];
          fullDayResult.push(halfDay[num]);
            for (var i = option; i >= 0; i--) {
              var fewHoursRandom = getRandom(fewHours.length);
              fewHours.splice[fewHoursRandom, 1];
              fullDayResult.push(fewHours[fewHoursRandom]);
            }
        } else if (option === 1) {
            for (var j = option; j >= 0; j--) {
              var fewHoursRandom = getRandom(fewHours.length);
              fewHours.splice[fewHoursRandom, 1];
              fullDayResult.push(fewHours[fewHoursRandom]);
        } else (option === 2) {
          let num = getRandom(fullDay.length);
          let fullDayRandom = fullDay[num];
          fullDayResult.push(fullDay[num]);
        }
    }
  }

function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}

};

});
