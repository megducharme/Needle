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


// $scope.getAllEvents = () => {
//   EventFactory.getTimeAllottedEvents("halfDay")
//     .then( (events) => {
//       Object.keys(events).forEach((key) =>{
//         events[key].id = key;
//         halfDay.push(events[key])
//       });
//       console.log("halfDay", halfDay);
//     });

//   EventFactory.getTimeAllottedEvents("fullDay")
//     .then ( ( events) => {
//       Object.keys(events).forEach((key) =>{
//         events[key].id = key;
//         fullDay.push(events[key])
//       });
//     });

//   EventFactory.getTimeAllottedEvents("fewHours")
//     .then ( (events) => {
//       Object.keys(events).forEach((key) =>{
//         events[key].id = key;
//         fewHours.push(events[key])
//       });
//       console.log("few hours length before promise", fewHours.length);
//     });
//   generateItinerary();
// };

$scope.getAllEvents = () => {
  Promise.all ([
    EventFactory.getTimeAllottedEvents("halfDay"),
    EventFactory.getTimeAllottedEvents("fewHours"),
    EventFactory.getTimeAllottedEvents("fullDay")
    ]).then(function(data) {
      console.log("data from promise all", data);
      extractDataFromPromiseAll(data);
    })
}

function extractDataFromPromiseAll(data) {
  Object.keys(data[0]).forEach((key) =>{
    data[0][key].id = key;
    fullDay.push(data[0][key])
  })
  console.log("full day array!?", fullDay);
  Object.keys(data[1]).forEach((key) =>{
    data[1][key].id = key;
    fewHours.push(data[1][key])
  })
  Object.keys(data[2]).forEach((key) =>{
    data[2][key].id = key;
    halfDay.push(data[2][key])
  })
generateItinerary();
}

function generateItinerary (){
    console.log("few hours length after promise", fewHours.length);
let userTime = $scope.userTime;
let options;
console.log("user time", userTime);

  switch(userTime) {
    // console.log("inside switch statement");
    case "fewHours":
      let num = getRandom(fewHours.length);
      console.log("fewHours length", fewHours.length);
      console.log("random number for few hour case", num);
      let fewHoursResult = fewHours[num];
      console.log("one event for few hours", fewHoursResult);
      console.log("fewHours array", fewHours);
      break;

    case "halfDay":
      options = getRandom(1);
      console.log("options should be random", options);
      console.log("options", options);
      let halfDayResult = [];
        if(options === 0) {
          for (var i = 1; i >= 0; i--) {
            var fewHoursRandom = getRandom(fewHours.length);
            console.log("few hours length in half day", fewHours.length);
            fewHours.splice[fewHours[fewHoursRandom], 1];
            halfDayResult.push(fewHours[fewHoursRandom]);
            console.log("halfDayResults in half day", halfDayResult);
          }
        }else {
          let num = getRandom(halfDay.length);
          console.log("few hours length in half day", fewHours.length);

          let halfDayResults = halfDay[num];
          halfDayResult.push(halfDayResults)
          console.log("halfDayResult in half day", halfDayResult);
          }
      break;

    case "fullDay":
      options = getRandom(2);
      // console.log("options in full day should be random", options);
      let fullDayResult = [];
        if(options === 0) {
          console.log("option 0 was randomly genereated");
          console.log("halfday length", halfDay.length);
          let num = getRandom(halfDay.length);
          console.log("num", num);
          let halfDayResult = halfDay[num];
          console.log("halfday result for full day itinerary", halfDayResult);
          fullDayResult.push(halfDay[num]);
            for (var i = 1; i >= 0; i--) {
              console.log("is this loop happening twice?");
              var fewHoursRandom = getRandom(fewHours.length);
              fewHours.splice(fewHours[fewHoursRandom], 1);
              console.log("few hours event to splice", fewHours[fewHoursRandom]);
              fullDayResult.push(fewHours[fewHoursRandom]);
            }
        }else if(options === 1) {
          console.log("option 1 was randomly genereated");
            for (var j = 1; j >= 0; j--) {
              var halfDayRandom = getRandom(halfDay.length);
              halfDay.splice(halfDay[halfDayRandom], 1);
              fullDayResult.push(halfDay[halfDayRandom]);
            }
        }else {
          console.log("option 2 was randomly genereated");
          let num = getRandom(fullDay.length);
          let fullDayRandom = fullDay[num];
          fullDayResult.push(fullDay[num]);
        }
        console.log("full day result!", fullDayResult);
  }
};

function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}


});
