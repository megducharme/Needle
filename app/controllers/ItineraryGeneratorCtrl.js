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
      console.log("few hours events to check after promise", fewHours);
      console.log("half day events", halfDay);
      console.log("full day events", fullDay);
    });
}


$scope.generateItinerary = () => {
    console.log("few hours array to check inside generate itinerary", fewHours);
    console.log("few hours length after promise", fewHours.length);
let userTime = $scope.userTime;
let options;
$scope.finalItinerary = [];
console.log("user time", userTime);


  switch(userTime) {
    // console.log("inside switch statement");
    case "fewHours":
    console.log("few hours array", fewHours);
      let num = getRandom(0, (fewHours.length-1));
    console.log("few hours length", fewHours.length);
    console.log("num from few hours", num);
      let fewHoursResult = fewHours[num];
      $scope.finalItinerary.push(fewHoursResult);
      break;

    case "halfDay":
      options = getRandom(0, 1);
        if(options === 0) {
          console.log("few hours array inside half day function", fewHours);
      console.log("option 0 was randomly generated");
          for (var i = 1; i >= 0; i--) {
            var fewHoursRandomHalfDay = getRandom(0, (fewHours.length-1));
            console.log("few hours length", fewHours.length);
            fewHours.splice(fewHoursRandomHalfDay, 1);
            $scope.finalItinerary.push(fewHours[fewHoursRandomHalfDay]);
          }
          console.log("freaking array after loops", fewHours);
        }else {
          let num = getRandom(0, (halfDay.length-1));
          console.log("few hours length in half day", (fewHours.length-1));
          let halfDayResults = halfDay[num];
          $scope.finalItinerary.push(halfDayResults);
          }
      break;

    case "fullDay":
      options = getRandom(0, 2);
      console.log("this should be random from 0-2!!");
      console.log("options in full day should be random", options);
        if(options === 0) {
          console.log("option 0 was randomly genereated, fullDay");
          let num = getRandom(0, (halfDay.length-1));
          console.log("halfday length", halfDay.length);
          console.log("num", num);
          let halfDayResult = halfDay[num];
          console.log("halfDayResult", halfDayResult);
          $scope.finalItinerary.push(halfDayResult);
            for (var m = 1; m >= 0; m--) {
              console.log("fewHours length in for loop ", fewHours.length);
              var fewHoursRandom = getRandom(0, (fewHours.length-1));
              console.log("few hours random", fewHoursRandom);
              console.log("array before the splice", fewHours);
              // fewHours.splice(fewHoursRandom, 1);
              console.log("object to splice", fewHours[fewHoursRandom]);
              console.log("array after the splice", fewHours);
              $scope.finalItinerary.push(fewHours[fewHoursRandom]);
            }
        }else if(options === 1) {
              let halfDayToChooseFrom = halfDay;
          console.log("option 1 was randomly genereated");
            for (var j = 1; j >= 0; j--) {
              console.log("halfDay array", halfDay);
              console.log("this this running twice?");
              var halfDayRandom = getRandom(0, (halfDay.length-1));
              console.log("half day length", halfDay.length);
              console.log("half day random number", halfDayRandom);
              // halfDay.splice(halfDayRandom, 1);
              $scope.finalItinerary.push(halfDay[halfDayRandom]);
            }
        }else {
          console.log("option 2 was randomly genereated");
          let num = getRandom(0, (fullDay.length-1));
          console.log("num in full day", num);
          console.log("full day lenght", fullDay.length);
          let fullDayRandom = fullDay[num];
          $scope.finalItinerary.push(fullDay[num]);
        }
  }

      console.log("final itinerary", $scope.finalItinerary);
      ItineraryFactory.setItinerary($scope.finalItinerary);
      $location.url("/finalItinerary");
      // flattenItinerary(finalItinerary);
};


function getRandom(min, max) {
  console.log("min in random", min, "max in random", max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


});
