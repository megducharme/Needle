"use strict";

app.controller("NavCtrl", function($scope, $location, EventFactory) {

    $scope.navItems = [
            {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
            {url: "#/login", name: "Login", showState: "!$parent.isLoggedIn"},
            {url: '#/myEvents', name: "My Events", showState: "$parent.isLoggedIn"},
            {url: '#/createEvent', name: "Create Event", showState: "$parent.isLoggedIn"},
            {url: '#/generateItinerary', name: "Generate Itinerary", showState: "$parent.isLoggedIn"},
    ];

    $scope.isActive = (viewLocation) => viewLocation === $location.path();

});
