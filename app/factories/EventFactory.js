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

let addUserProfile = (userProfileObject) => {
  return $q(function (resolve, reject) {
    $http.post(`${FirebaseURL}users.json`, JSON.stringify(userProfileObject))
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
    $http.get(`{$FirebaseURL}preferences.json?orderBy"uid"&equalTo"${userId}"`)
    .success( (selectedEvents) => {
      resolve(selectedEvents);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let getUserObject = (userId) => {
  console.log("are we getting an id?", userId);
  return $q (function (resolve, reject) {
    $http.get(`${FirebaseURL}users.json?orderBy="uid"&equalTo="${userId}"`)
    .success( (userObject) => {
      resolve(userObject);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let addPreferencesToUserObject = (checkboxValues) => {
  return $q(function (resolve, reject) {
    $http.put(`${FirebaseURL}preferences.json`, JSON.stringify(checkboxValues))
    .success( (largeObject) => {
      resolve(largeObject);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

  return{addUserProfile, getEvents, getUserObject, addPreferencesToUserObject, getPreferredEvents};

});
