"use strict";

app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location, ItineraryFactory) {

$scope.userTime = null;
$scope.finalItinerary = null;
$scope.nashvilleWeather = null;
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
            $scope.finalItinerary.push(fewHours[fewHoursRandomHalfDay]);
            fewHours.splice(fewHoursRandomHalfDay, 1);
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

          console.log("duplicate?");

        }else if(options === 1) {

            for (var j = 1; j >= 0; j--) {
              var halfDayRandom = getRandom(0, (halfDay.length-1));
              $scope.finalItinerary.push(halfDay[halfDayRandom]);
              halfDay.splice(halfDayRandom, 1);
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


$scope.getWeather = () => {
  console.log("inside the get weather function");
  EventFactory.getNashWeather()
  .then ( (nashWeather) => {
    console.log("nashville weather", nashWeather);
    $scope.weatherIcon = nashWeather.current_observation.icon_url;
    console.log("weather icon", $scope.weatherIcon);
    $scope.feelsLike = nashWeather.current_observation.feelslike_string;
    console.log("weather feelslike", $scope.feelsLike);
    $scope.precipitation = nashWeather.current_observation.precip_today_string;
    console.log("weather precip", $scope.precipitation);
  });
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


});




// SEPARATE EVENTS BY MORNING AFTERNOON AND EVENING
// SEPARATE EVENTS BY MORNING AFTERNOON AND EVENING
// SEPARATE EVENTS BY MORNING AFTERNOON AND EVENING
// SEPARATE EVENTS BY MORNING AFTERNOON AND EVENING
// SEPARATE EVENTS BY MORNING AFTERNOON AND EVENING




// "use strict";

// app.controller("ItineraryGeneratorCtrl", function ($scope, EventFactory, $location, ItineraryFactory) {

// $scope.userTime = null;
// $scope.finalItinerary = null;
// $scope.nashvilleWeather = null;

// let userId;
// let halfDay = [];
// let fullDay = [];
// let fewHours = [];

// let morningEvents = [];
// let afternoonEvents = [];
// let eveningEvents = [];
// let anytimeEvents = [];


// $scope.$parent.getUser()
//   .then ( (user) => {
//     userId = user;
//   filterUserEvents(userId);
//   })
//   .catch(() => console.error);


// function filterUserEvents (userId){
//   EventFactory.getUserEvents(userId)
//     .then ( (events) => {
//       console.log("user events", events);
//       for (var i = events.length - 1; i >= 0; i--) {
//         if(events[i].time === "halfDay"){
//           halfDay.push(events[i]);
//         }else if (events[i].time === "fewHours"){
//           fewHours.push(events[i]);
//         }else {
//           fullDay.push(events[i]);
//         }
//       }
//     });
// }

// $scope.generateItinerary = () => {

// let userTime = $scope.userTime;
// let options;
// let semiFinalItinerary = [];
// console.log("user time", userTime);


//   switch(userTime) {
//     // console.log("inside switch statement");
//     case "fewHours":
//       let num = getRandom(0, (fewHours.length-1));
//       let fewHoursResult = fewHours[num];
//       semiFinalItinerary.push(fewHoursResult);
//       break;

//     case "halfDay":
//       options = getRandom(0, 1);
//         if(options === 0) {
//           for (var i = 1; i >= 0; i--) {
//             var fewHoursRandomHalfDay = getRandom(0, (fewHours.length-1));
//             fewHours.splice(fewHoursRandomHalfDay, 1);
//             semiFinalItinerary.push(fewHours[fewHoursRandomHalfDay]);
//           }
//         }else {
//           let num = getRandom(0, (halfDay.length-1));
//           let halfDayResults = halfDay[num];
//           semiFinalItinerary.push(halfDayResults);
//           }
//       break;

//     case "fullDay":
//       options = getRandom(0, 2);
//         if(options === 0) {
//           let num = getRandom(0, (halfDay.length-1));
//           let halfDayResult = halfDay[num];
//           semiFinalItinerary.push(halfDayResult);
//             for (var m = 1; m >= 0; m--) {
//               var fewHoursRandom = getRandom(0, (fewHours.length-1));
//               semiFinalItinerary.push(fewHours[fewHoursRandom]);
//             }
//         }else if(options === 1) {
//               let halfDayToChooseFrom = halfDay;
//             for (var j = 1; j >= 0; j--) {
//               var halfDayRandom = getRandom(0, (halfDay.length-1));
//               halfDay.splice(halfDayRandom, 1);
//               semiFinalItinerary.push(halfDay[halfDayRandom]);
//             }
//         }else {
//           let num = getRandom(0, (fullDay.length-1));
//           let fullDayRandom = fullDay[num];
//           semiFinalItinerary.push(fullDay[num]);
//         }
//   }

//       setEventTime(semiFinalItinerary);
// };


// function setEventTime(itineraryData){
//   console.log("itinerary data", itineraryData);

//   for (var singleObject in itineraryData){
//     console.log("single object", singleObject);
//     if (itineraryData[singleObject].when === "Morning") {
//       morningEvents.push(itineraryData[singleObject]);
//       console.log("morning objects to push", itineraryData[singleObject]);
//     }
//     if (itineraryData[singleObject].when === "Afternoon") {
//       afternoonEvents.push(itineraryData[singleObject]);
//     }
//     if (itineraryData[singleObject].when === "Evening") {
//       eveningEvents.push(itineraryData[singleObject]);
//     }
//     else {
//       anytimeEvents.push(itineraryData[singleObject]);
//     }

//   buildEventTimingObjectsForDom();
//   }
// }

// function buildEventTimingObjectsForDom() {
//   $scope.finalItinerary = [];

// if(morningEvents.length >= 1) {
//   let morningObject = {
//     when:"Morning",
//     events: morningEvents
//   };
//   console.log("morning event object", morningObject);
//   $scope.finalItinerary.push(morningObject);
// }
// if(afternoonEvents.length >= 1) {
//   let afternoonObject = {
//     when:"Afternoon",
//     events: morningEvents
//   };
//   $scope.finalItinerary.push(afternoonObject);
// }
// if(eveningEvents.length >= 1) {
//   let eveningObject = {
//     when:"Evening",
//     events: eveningEvents
//   };
//   $scope.finalItinerary.push(eveningObject);
// }
// if(anytimeEvents.length >= 1) {
//   let anytimeObject = {
//     when:"Anytime",
//     events: anytimeEvents
//   };
//   $scope.finalItinerary.push(anytimeObject);
// }

// console.log("final itinerary object(s) - should be object with array of objects with that time ---- obj -- afternoon -- array of objects", $scope.finalItinerary);
// ItineraryFactory.setItinerary($scope.finalItinerary);
// $location.url("/finalItinerary");

// }

// $scope.getWeather = () => {
//   console.log("inside the get weather function");
//   EventFactory.getNashWeather()
//   .then ( (nashWeather) => {
//     console.log("nashville weather", nashWeather);
//     $scope.weatherIcon = nashWeather.current_observation.icon_url;
//     console.log("weather icon", $scope.weatherIcon);
//     $scope.feelsLike = nashWeather.current_observation.feelslike_string;
//     console.log("weather feelslike", $scope.feelsLike);
//     $scope.precipitation = nashWeather.current_observation.precip_today_string;
//     console.log("weather precip", $scope.precipitation);
//   });
// };

// function getRandom(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
