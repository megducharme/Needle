"use strict";

app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location) {

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
  })
  .catch(() => console.error);

  $scope.user = {
    time:""
  };

let userTime = $scope.user.time;

$scope.generateItinerary = (userTime) => {
console.log("user selected time", $scope.userTime)
EventFactory.getUserEvents(userId)
  .then ( (events) => {
    if (event.time === "halfDay" && $scope.timeVal === "halfDay"){
      let random = (Math.random(0 - events.length)*(events.length)+1)
      $scope.events[random]

    } else if (event.time === "fullDay"){
      let random = (Math.random(0 - events.length)*(events.length)+1)
      $scope.events[random]

    } else if (event.time === "fewHours"){
      let random = (Math.random(0 - events.length)*(events.length)+1)
      $scope.events[random]

    };
  });
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//get all of the user's events
//sort by (if time ===



// $scope.getAllottedEvents = (userTime) => {

// let halfDay = [];
// let fullDay = [];
// let fewHours = [];
// console.log("time user has", userTime);

//   EventFactory.getTimeAllottedEvents(halfDay)
//     .then( (events) => {
//       halfDay = events;
//     });

//   EventFactory.getTimeAllottedEvents(fullDay)
//     .then ( ( events) => {
//       fullDay = events;
//     });

//   EventFactory.getTimeAllottedEvents(fewHours)
//     .then ( (events) => {
//       fewHours = events;
//     });

// console.log("halfday", halfDay);
// console.log("fullDay", fullDay);
// console.log("fewHours", fewHours);

// };



});
