"use strict";

app.controller("UserAccountCtrl", function ($scope, EventFactory, $location, UserFactory) {

let userId;

$scope.$parent.getUser()
  .then ( (user) => {
    // console.log("resolved");
    $scope.userObject.userId = user;
  })
  .catch(() => console.error);


$scope.userObject = {
  name:null,
  currentLocation:null,
  preferences:null
};

$scope.createUserProfile = () => {
  EventFactory.addUserProfile($scope.userObject)
  .then(()=>{
        $location.path("/preferences");
  // console.log("this is from the create user", $scope.userObject);
});
  UserFactory.setUserObj($scope.userObject)
};

});

//GET GEO LOCATION ----------------------------
//GET GEO LOCATION ----------------------------
// $scope.map = { center: { latitude: 11.8251, longitude: 42.5903 }, zoom: 8};

//   $scope.options = {scrollwheel: false};

//   $scope.coordsUpdates = 0;
//   $scope.dynamicMoveCtr = 0;
//   $scope.marker = {
//     id: 0,
//     coords: {
//       latitude: 11.8251,
//       longitude: 42.5903
//     },

//     options: {draggable: true},

//     events: {
//       dragend: function (marker, eventName, args) {
//         $log.log('marker dragend');
//         var lat = marker.getPosition().lat();
//         var lon = marker.getPosition().lng();
//         $log.log(lat);
//         $log.log(lon);
//         $scope.marker.options = {
//           draggable: true,
//           labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
//           labelAnchor: "100 0",
//           labelClass: "marker-labels"
//         };
//       }
//     }
//   };
//   $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
//     if (_.isEqual(newVal, oldVal))
//       return;
//     $scope.coordsUpdates++;
//   });
//   $timeout(function () {
//     $scope.marker.coords = {
//       latitude: 11.8251,
//       longitude: 42.5903
//     };
//   }, 1000);

//   $scope.initMap = function initMap() {
//     console.log("are we working?");
//     console.log(navigator.geolocation);

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {

//         let pos = {
//           center: {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           },
//           zoom: 20
//         };
//         $scope.map = pos;
//         lat = pos.center.latitude;
//         long = pos.center.longitude;
//         $scope.geolocated = true;
//         $scope.marker = {
//           coords: {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           },
//           id: "party"
//         };
//         $scope.$apply();
//       });
//     }
//   };
// });
//GET GEO LOCATION ----------------------------
//GET GEO LOCATION ----------------------------




