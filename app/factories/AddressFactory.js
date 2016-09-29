"use strict";
app.factory("AddressFactory", function ($q, $http) {

let currentZip = null;

  return {
    setCurrentZip: function (userZip) {
      currentZip = userZip;
    },
    getUserZip: function () {
      return currentZip;
    }
  };

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

});
