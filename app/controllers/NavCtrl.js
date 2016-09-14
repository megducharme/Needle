"use strict";

app.controller("NavCtrl", function($scope, $location) {
    $scope.navItems = [    //create an array of objects
            {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
            {url: "#/login", name: "Login", showState: "!$parent.isLoggedIn"},
            //a ! becuase we want this to show when the others done
            //$parent scope inherits from the root scope from what is wrapped around it
            // {url: '#/allpins', name: "All Pins", showState: "$parent.isLoggedIn"},
            // {url: '#/allboards', name: "All Boards", showState: "$parent.isLoggedIn"},
            // {url: '#/newboard', name: "New Board", showState: "$parent.isLoggedIn"},
            // {url: '#/newpin', name: "New Pin", showState: "$parent.isLoggedIn"}
    ];

    $scope.isActive = (viewLocation) => viewLocation === $location.path();
});
