"use strict";

app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location) {

$scope.userTime = null;
$scope.writeItineraryToDom = null;
let userId;
let halfDay = [];
let fullDay = [];
let fewHours = [];
$scope.writeItineraryToDom = [];


$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
  })
  .catch(() => console.error);



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
    halfDay.push(data[0][key])
  })
  console.log("full day array!?", fullDay);
  Object.keys(data[1]).forEach((key) =>{
    data[1][key].id = key;
    fewHours.push(data[1][key])
  })
  Object.keys(data[2]).forEach((key) =>{
    data[2][key].id = key;
    fullDay.push(data[2][key])
  console.log("halfday data - is it filled?", halfDay);
  })
  console.log("halfday length", halfDay.length);

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
      let num = getRandom(fewHours.length)
      let fewHoursResult = fewHours[num];
      $scope.writeItineraryToDom.push(fewHoursResult);
      console.log("fewHours length", fewHours.length);
      console.log("random number for few hour case", num);
      console.log("one event for few hours", fewHoursResult);
      console.log("fewHours array", fewHours);
      break;

    case "halfDay":
      options = getRandom(1);
      console.log("options should be random", options);
      console.log("options", options);
        if(options === 0) {
          for (var i = 1; i >= 0; i--) {
            var fewHoursRandom = getRandom(fewHours.length);
            console.log("few hours length in half day", fewHours.length);
            fewHours.splice[fewHours[fewHoursRandom], 1];
            $scope.writeItineraryToDom.push(fewHours[fewHoursRandom]);
            console.log("halfDayResults in half day", halfDayResult);
          }
        }else {
          let num = getRandom(halfDay.length);
          console.log("few hours length in half day", fewHours.length);
          let halfDayResults = halfDay[num];
          $scope.writeItineraryToDom.push(halfDayResults)
          console.log("halfDayResult in half day", halfDayResult);
          }
      break;

    case "fullDay":
      options = getRandom(2);
      // console.log("options in full day should be random", options);
        if(options === 0) {
          console.log("option 0 was randomly genereated");
          console.log("halfday length", halfDay.length);
          let num = getRandom(halfDay.length);
          console.log("num", num);
          let halfDayResult = halfDay[num];
          console.log("halfday result for full day itinerary", halfDayResult);
          $scope.writeItineraryToDom.push(halfDay[num]);
            for (var i = 1; i >= 0; i--) {
              console.log("is this loop happening twice?");
              var fewHoursRandom = getRandom(fewHours.length);
              fewHours.splice(fewHours[fewHoursRandom], 1);
              console.log("few hours event to splice", fewHours[fewHoursRandom]);
              $scope.writeItineraryToDom.push(fewHours[fewHoursRandom]);
            }
        }else if(options === 1) {
          console.log("option 1 was randomly genereated");
            for (var j = 1; j >= 0; j--) {
              var halfDayRandom = getRandom(halfDay.length);
              halfDay.splice(halfDay[halfDayRandom], 1);
              $scope.writeItineraryToDom.push(halfDay[halfDayRandom]);
            }
        }else {
          console.log("option 2 was randomly genereated");
          let num = getRandom(fullDay.length);
          let fullDayRandom = fullDay[num];
          $scope.writeItineraryToDom.push(fullDay[num]);
        }
  }
        $location.url("/finalItinerary");
};

function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}


});
