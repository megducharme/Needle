// "use strict";
// app.factory("AddressFactory", function ($q, $http) {
//   return {
//     currentAddress: ""
//   };

// let distanceFromCurrent = function (currentAddress, eventAddress) {
//   return $q ( (resolve, reject) => {
//     $http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${currentAddress}&destinations=${eventAddress}&mode=walking&key=${FBCreds.googleKey}`)
//     .success((mapData) => {
//       console.log("mapData from google", mapData);
//       resolve(mapData);
//     })
//     .error((error) => {
//       reject(error);
//     });
//   });
// };

// return {distanceFromCurrent};

// });
