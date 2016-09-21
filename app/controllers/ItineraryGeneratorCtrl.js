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
      console.log("half day events", halfDay);
      console.log("few hours events", fewHours);
      console.log("full day events", fullDay);
    });
}


$scope.generateItinerary = () => {
    console.log("few hours length after promise", fewHours.length);
let userTime = $scope.userTime;
let options;
$scope.finalItinerary = [];
console.log("user time", userTime);


  switch(userTime) {
    // console.log("inside switch statement");
    case "fewHours":
    console.log("few hours array", fewHours);
      let num = getRandom(fewHours.length);
    console.log("few hours length", fewHours.length);
    console.log("num from few hours", num);
      let fewHoursResult = fewHours[num];
    console.log("few hours result, should be object", fewHoursResult);
      $scope.finalItinerary.push(fewHoursResult);
      break;

    case "halfDay":
      options = getRandom(1);
      console.log("option 1 was randomly generated");
        if(options === 0) {
          for (var i = 1; i >= 0; i--) {
            var fewHoursRandomHalfDay = getRandom(fewHours.length);
            fewHours.splice(fewHoursRandomHalfDay, 1);
            $scope.finalItinerary.push(fewHours[fewHoursRandomHalfDay]);
          }
        }else {
          let num = getRandom(halfDay.length);
          console.log("few hours length in half day", fewHours.length);
          let halfDayResults = halfDay[num];
          $scope.finalItinerary.push(halfDayResults);
          }
      break;

    case "fullDay":
      options = getRandom(2);
      // console.log("options in full day should be random", options);
        if(options === 0) {
          let num = getRandom(halfDay.length);
          console.log("halfday length", halfDay.length);
          console.log("num", num);
          let halfDayResult = halfDay[num];
          $scope.finalItinerary.push(halfDay[num]);
            for (var m = 1; m >= 0; m--) {
              var fewHoursRandom = getRandom(fewHours.length);
              fewHours.splice(fewHoursRandom, 1);
              $scope.finalItinerary.push(fewHours[fewHoursRandom]);
            }
        }else if(options === 1) {
          console.log("option 1 was randomly genereated");
            for (var j = 1; j >= 0; j--) {
              var halfDayRandom = getRandom(halfDay.length);
              halfDay.splice(halfDayRandom, 1);
              $scope.finalItinerary.push(halfDay[halfDayRandom]);
            }
        }else {
          let num = getRandom(fullDay.length);
          let fullDayRandom = fullDay[num];
          $scope.finalItinerary.push(fullDay[num]);
        }
  }

      console.log("final itinerary", $scope.finalItinerary);
      ItineraryFactory.setItinerary($scope.finalItinerary);
      $location.url("/finalItinerary");
      // flattenItinerary(finalItinerary);
};


// function flattenItinerary (information) {
//   console.log("information - should be itinerary", information)
//   for (var i = information.length - 1; i >= 0; i--) {
//       console.log("information[i]", information[i]);
//       $scope.writeItineraryToDom.push(information[i])
//   }
//   console.log("events to write to dom", $scope.writeItineraryToDom);
// }

// $scope.getAllEvents = () => {
//   Promise.all ([
//     EventFactory.getTimeAllottedEvents("halfDay"),
//     EventFactory.getTimeAllottedEvents("fewHours"),
//     EventFactory.getTimeAllottedEvents("fullDay")
//     ]).then(function(data) {
//       console.log("data from promise all", data);
//       extractDataFromPromiseAll(data);
//     })
// }

// function extractDataFromPromiseAll(data) {
//   let filteredHalfDay = [];

//   Object.keys(data[0]).forEach((key) =>{
//     data[0][key].id = key;
//     halfDay.push(data[0][key])
//   })
//   console.log("full day array!?", fullDay);
//   Object.keys(data[1]).forEach((key) =>{
//     data[1][key].id = key;
//     fewHours.push(data[1][key])
//   })
//   Object.keys(data[2]).forEach((key) =>{
//     data[2][key].id = key;
//     fullDay.push(data[2][key])
//   console.log("halfday data - is it filled?", halfDay);
//   })
//   console.log("halfday length", halfDay.length);

// generateItinerary();

// }

function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}


});
