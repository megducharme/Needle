"use strict";

app.controller("UserSelectionCtrl", function ($scope, EventFactory) {
  // let userId = $scope.parent.getUser();
    $scope.events = [];
    EventFactory.getEvents()
    .then ( (eventsArr) => {
      $scope.events = eventsArr;
      console.log("events", eventsArr);
    });

});
