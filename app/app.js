"use strict";

var app = angular.module("Needle", ["ngRoute"])
.constant("FirebaseURL", "https://needle-fadd7.firebaseio.com/");

app.config(function($routeProvider){

   let isAuth = (AuthFactory) => new Promise( (resolve, reject) => {
      AuthFactory.isAuthenticated()
      .then( (user) => {
        if(user) {
          resolve();
        } else {
          reject();
        }
      });
    });

   $routeProvider.

    when("/", {
      templateUrl: "partials/welcome.html",
      controller: "LoginCtrl"
    }).
    when("/login", {
            templateUrl:"partials/login.html",
            controller: "LoginCtrl",
        }).
    when("/createAccount", {
            templateUrl:"partials/create-account.html",
            controller: "UserAccountCtrl",
            resolve: {isAuth}
        }).
    when("/preferences", {
            templateUrl:"partials/preferences.html",
            controller: "UserPreferencesCtrl",
            resolve: {isAuth}
        }).
    when("/selections", {
            templateUrl:"partials/user-selections.html",
            controller: "UserSelectionCtrl",
            resolve: {isAuth}
        }).
     when("/createEvent", {
            templateUrl:"partials/new-event-form.html",
            controller: "AddNewEventCtrl",
            resolve: {isAuth}
        }).
     when("/myEvents", {
            templateUrl:"partials/user-events.html",
            controller: "UserEventsCtrl",
            resolve: {isAuth}
        }).
     when("/generateItinerary", {
            templateUrl:"partials/itinerary.html",
            controller: "ItineraryGeneratorCtrl",
            resolve: {isAuth}
        }).
     when("/:eventId/edit", {
            templateUrl:"partials/new-event-form.html",
            controller: "EditEventCtrl",
            resolve: {isAuth}
        }).
     when("/finalItinerary", {
            templateUrl:"partials/final-itinerary",
            controller: "DisplayItineraryCtrl",
            resolve: {isAuth}
        }).
     when("/nssTab", {
            templateUrl:"partials/nss-tab",
            controller: "NSSCtrl",
            resolve: {isAuth}
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
