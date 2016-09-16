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

let getSingleEvent = (eventType) => {
  let events = [];
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseURL}events.json?orderBy="type"&equalTo="${eventType}"`)
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

// let getPreferredEvents = (userId) => {
//   return $q(function (resolve, reject) {
//     $http.get(`{$FirebaseURL}preferences.json?orderBy"uid"&equalTo"${userId}"`)
//     .success( (selectedEvents) => {
//       resolve(selectedEvents);
//     })
//     .error( (error) => {
//       reject(error);
//     });
//   });
// };

let getUserObject = (userId) => {
  return $q (function (resolve, reject) {
    $http.get(`${FirebaseURL}users.json?orderBy="userId"&equalTo="${userId}"`)
    .success( (userObj) => {
      resolve(userObj);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let getAllUsersFromFB = () => {
  return $q (function (resolve, reject) {
    $http.get(`${FirebaseURL}users.json`)
    .success( (userObjs) => {
      resolve(userObjs);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

let addPreferencesToUserObject = (userObjToEdit, key) => {
  console.log("what is the key", key);
  return $q(function (resolve, reject) {
    $http.patch(`${FirebaseURL}users/${key}.json`, JSON.stringify(userObjToEdit))
    .success( (object) => {
      resolve(object);
    })
    .error( (error) => {
      reject(error);
    });
  });
};

  return{addUserProfile, getEvents, getUserObject, addPreferencesToUserObject, getSingleEvent};

});
