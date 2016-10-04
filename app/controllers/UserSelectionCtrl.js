"use strict";

app.controller("UserSelectionCtrl", function ($scope, EventFactory, $q) {

console.log("USER SELECTION LOADED");

let userId;

let preferencesCoffee = [];
let preferencesBreweries = [];
let preferencesWaterfallHikes = [];
let preferencesLiveMusic= [];
let preferencesTours = [];
let preferencesRestaurants = [];
let preferencesCityPark = [];
let preferencesGetDrinks = [];
let preferencesShopping = [];


$scope.$parent.getUser()
  .then ( (user) => {
    userId = user;
    showEvents();
    console.log("should have go to showEvents by now");
  })
  .catch(() => console.error);


function showEvents() {
  EventFactory.getUserObject(userId)
    .then ( (user) => {
      console.log("this needs to be one user", user);
      for(var key in user){
        $scope.preferences = user[key].preferences;
      }
      console.log("$scope.preferences in the loop", $scope.preferences);
      getAllPreferredEvents();
    });
}

function getAllPreferredEvents() {
  var promises = [];
  for(var i = 0; i < $scope.preferences.length; i++) {
    var promise = EventFactory.getEventsByType($scope.preferences[i]);
    promises.push(promise);
  }
  console.log("promises", promises);
  $q.all(promises).then( (data) => {
    flattenObjects(data);
  });
}


function flattenObjects(data) {

  console.log("data to be flattened", data);
  data.forEach(function(object) {

    for (var singleObject in object){
      if (object[singleObject].type === "coffee") {
        preferencesCoffee.push(object[singleObject]);
        console.log("coffee objects to push", object[singleObject]);
      }
      if (object[singleObject].type === "breweries") {
        preferencesBreweries.push(object[singleObject]);
      }
      if (object[singleObject].type === "liveMusic") {
        preferencesLiveMusic.push(object[singleObject]);
      }
      if (object[singleObject].type === "tours") {
        preferencesTours.push(object[singleObject]);
      }
      if (object[singleObject].type === "restaurants") {
        preferencesRestaurants.push(object[singleObject]);
      }
      if (object[singleObject].type === "cityPark") {
        preferencesCityPark.push(object[singleObject]);
      }
      if (object[singleObject].type === "waterfallHikes") {
        preferencesWaterfallHikes.push(object[singleObject]);
      }
      if (object[singleObject].type === "shopping") {
        preferencesShopping.push(object[singleObject]);
      }
      console.log("should be coffee array of objects", preferencesCoffee);
    }

    buildObjectsForDom();
  });
}

function buildObjectsForDom() {
  console.log("inside the build objects for dom function");
  $scope.objectsForDOM = [];
  console.log("coffee array inside building an object", preferencesCoffee);

if(preferencesCoffee.length >= 1) {
  let coffeeObject = {
    eventType:"Coffee Shops",
    events: preferencesCoffee
  };
  console.log("COFFEE OBJECT IS RIGHT HERE", coffeeObject);
  $scope.objectsForDOM.push(coffeeObject);
  console.log("scope objs for the dom THIS ONE", $scope.objectsForDOM);
}
if(preferencesBreweries.length >= 1) {
  let breweriesObject = {
    eventType:"Breweries",
    events: preferencesBreweries
  };
  $scope.objectsForDOM.push(breweriesObject);
  console.log("breweries obj", breweriesObject);
}
if(preferencesWaterfallHikes.length >= 1) {
  let waterfallHikesObject = {
    eventType:"Waterfall Hikes",
    events: preferencesWaterfallHikes
  };
  console.log("waterfall obj", waterfallHikesObject);
  $scope.objectsForDOM.push(waterfallHikesObject);
}
if(preferencesLiveMusic.length >= 1) {
  let liveMusicObject = {
    eventType:"Live Music",
    events: preferencesLiveMusic
  };
  console.log("live music obj", liveMusicObject);
  $scope.objectsForDOM.push(liveMusicObject);
}
if(preferencesTours.length >= 1) {
  let toursObject = {
    eventType:"Tours",
    events: preferencesTours
  };
  console.log("tours obj", toursObject);
  $scope.objectsForDOM.push(toursObject);
}
if(preferencesRestaurants.length >= 1) {
  let restaurantObject = {
    eventType:"Restaurants",
    events: preferencesRestaurants
  };
  console.log("restaurants obj", restaurantObject);
  $scope.objectsForDOM.push(restaurantObject);
}
if(preferencesCityPark.length >= 1) {
  let cityParkObject = {
    eventType:"City Parks",
    events: preferencesCityPark
  };
  console.log("city parks obj", cityParkObject);
  $scope.objectsForDOM.push(cityParkObject);
}
if(preferencesGetDrinks.length >= 1) {
  let getDrinksObject = {
    eventType:"Get Drinks",
    events: preferencesGetDrinks
  };
  console.log("drinks obj", getDrinksObject);
  $scope.objectsForDOM.push(getDrinksObject);
}
if(preferencesShopping.length >= 1) {
  let shoppingObject = {
    eventType:"Shopping",
    events: preferencesShopping
  };
  console.log("shopping obj", shoppingObject);
  $scope.objectsForDOM.push(shoppingObject);
}
console.log("objects for DOM", $scope.objectsForDOM);
}

$scope.saveEventToProfileVisited = (event) => {
  console.log("saving an event to profile event", event);
  event.type = "saved";
  event.visited = true;
  event.uid = userId;
  EventFactory.addEventToUserProfile(event)
    .then( (response) => {
      $scope.eventsVisited = response;
    });
};

$scope.saveEventToProfileNotVisited = (event) => {
  console.log("saving an event to profile event", event);
  event.type = "saved";
  event.visited = false;
  event.uid = userId;
  EventFactory.addEventToUserProfile(event)
    .then( (response) => {
      $scope.eventsNotVisited = response;
    });
};

});
