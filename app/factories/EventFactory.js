"use strict";

app.factory("EventFactory", ($q, $http, FirebaseURL) => {

let getEvents = () => {
  let events = [];
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseURL}events.json`)
    .success((eventObject) => {
      console.log(eventObject);
      Object.keys(eventObject).forEach((key) =>{
        eventObject[key].id = key;
        events.push(eventObject[key]);
      });
      resolve(events);
    })
    .error((error) => {
      reject(error);
    });
  });
};

let userProfile = (userProfileObject) => {
  return $q(function (resolve, reject) {
    $http.post(`{FirebaseURL})users.json`)
    .success( (userProfile) => {
      resolve(userProfile);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let getPreferredEvents = (userId) => {
  return $q(function (resolve, reject) {
    $http.get(`{FirebaseURL}preferences.json?orderBy"uid"&equalTo${userId}`)
    .success( (selectedEvents) => {
      resolve(selectedEvents);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let addPreferences = (checkboxValues) => {
  return $q(function (resolve, reject) {
    $http.put(`${FirebaseURL}preferences.json`)
    .success( (largeObject) => {
      resolve(largeObject);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

  return{getEvents, userProfile, addPreferences, getPreferredEvents};

});
