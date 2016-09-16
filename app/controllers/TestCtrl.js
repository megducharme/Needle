"use strict";

app.controller("TestCtrl", function($scope, EventFactory) {

  let events = [];

  EventFactory.getEvents()
    .then((events) => {
      $scope.events = events;
      // console.log("these are the events", events);
    });

});
