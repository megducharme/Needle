"use strict";

var app = angular.module("Needle", ["ngRoute"])
.constant("FirebaseURL", "https://needle-fadd7.firebaseio.com/");

app.config(function($routeProvider){

   let isAuth = (AuthFactory) => new Promise( (resolve, reject) =>
     {
        if(AuthFactory.isAuthenticated()) {
            resolve();
        } else {
            reject();
        }
    });

   $routeProvider.

    when("/", {
      templateUrl: "partials/welcome.html",
      controller: "LoginCtrl"
    }).
    when("/login", {
            templateUrl:"partials/login.html",
            controller: "LoginCtrl"
        }).
    when("/welcome", {
            templateUrl:"partials/create-account.html",
            controller: "UserAccountCtrl"
        }).
    when("/preferences", {
            templateUrl:"partials/preferences.html",
            controller: "UserPreferencesCtrl"
        }).
    when("/selections", {
            templateUrl:"partials/user-selections.html",
            controller: "UserSelectionCtrl"
        }).
    when("/test", {
      templateUrl: "partials/test.html",
      controller: "TestCtrl"
    }).
    otherwise("/");
});

app.run( ($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
});
