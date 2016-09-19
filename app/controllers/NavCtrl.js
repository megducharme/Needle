"use strict";

app.controller("NavCtrl", function($scope, $location, EventFactory) {

    $scope.navItems = [    //create an array of objects
            {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
            {url: "#/login", name: "Login", showState: "!$parent.isLoggedIn"},
            {url: '#/myEvents', name: "My Events", showState: "$parent.isLoggedIn"},
            {url: '#/createEvent', name: "Create Event", showState: "$parent.isLoggedIn"},
            // {url: '#/allboards', name: "All Boards", showState: "$parent.isLoggedIn"},
            // {url: '#/newboard', name: "New Board", showState: "$parent.isLoggedIn"},
            // {url: '#/newpin', name: "New Pin", showState: "$parent.isLoggedIn"}
    ];

    $scope.isActive = (viewLocation) => viewLocation === $location.path();

});
