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

});
