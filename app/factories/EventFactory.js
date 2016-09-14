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

let userProfile = () => {
  return $q(function (resolve, reject) {
    $http.post(`{FirebaseURL})users.json`
  })
}

  return{getEvents};

});
