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

let getUserEvents = (userId) => {
  console.log("userID to get user events from FB", userId);
  let userEvents = [];
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseURL}events.json?orderBy="uid"&equalTo="${userId}"`)
    .success((userEventObjects) => {
      console.log(userEventObjects);
      Object.keys(userEventObjects).forEach((key) =>{
        userEventObjects[key].id = key;
        userEvents.push(userEventObjects[key]);
      });
      resolve(userEvents);
    })
    .error((error) => {
      reject(error);
    });
  });
};


let addEventToUserProfile = (event) => {
  console.log("this one should be the new event the user wants to add", event);
  return $q( (resolve, reject) => {
    $http.post("https://needle-fadd7.firebaseio.com/events.json", angular.toJson(event))
    .success((eventObject) => {
      console.log("event in addevent to user profile function in event factory", eventObject);
      resolve(eventObject);
    })
    .error((error) => {
      reject(error);
    });
  });
};


let getEventsByType = (eventType) => {
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseURL}events.json?orderBy="type"&equalTo="${eventType}"`)
    .success((eventObject) => {
      console.log("event objects getting event by type", eventObject);
      resolve(eventObject);
    })
    .error((error) => {
      reject(error);
    });
  });
};

let getSingleEventToEdit = (eventId) => {
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseURL}events/${eventId}.json`)
    .success((eventObject) => {
      console.log("meg, this one", eventObject);
      resolve(eventObject);
    })
    .error((error) => {
      reject(error);
    });
  });
};


let getTimeAllottedEvents = (time) => {
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseURL}events.json?orderBy="time"&equalTo="${time}"`)
    .success((events) => {
      resolve(events);
    })
    .error((error) => {
      reject(error);
    });
  });
};


let updateEvent = (eventId, editedEvent) => {
  return $q( (resolve, reject) => {
    $http.put(`${FirebaseURL}events/${eventId}.json`, JSON.stringify(editedEvent))
    .success((eventObject) => {
      console.log("updated event", eventObject);
      resolve(eventObject);
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

let deleteUserEvent = (eventId) => {
  return $q (function (resolve, reject) {
    $http.delete(`${FirebaseURL}events/${eventId}.json`)
    .success( (userObjs) => {
      resolve(userObjs);
    })
    .error( (error) => {
      reject(error);
    });
  });
};


// let addNewEvents = (newEvent) => {
//   return $q( (resolve, reject) => {
//     $http.post(`${FirebaseURL}events.json`, JSON.stringify(newEvent))
//     .success((eventObject) => {
//       console.log(eventObject);
//       resolve(eventObject);
//     })
//     .error((error) => {
//       reject(error);
//     });
//   });
// };

// let patchUserEventsWithFbId = (userId) => {
//   return $q( (resolve, reject) => {
//     $http.put(`${FirebaseURL}events.json?orderBy="uid"&equalTo="${userId}"`)
//     .success((userEventObjects) => {
//       });
//       resolve(userEventObjects);
//     })
//     .error((error) => {
//       reject(error);
//     });
// };

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


// let getSingleEvent = (eventId) => {
//   return $q( (resolve, reject) => {
//     $http.get(`${FirebaseURL}events.json?orderBy="id"&equalTo="${eventId}"`)
//     .success((eventObject) => {
//       console.log(eventObject);
//       resolve(events);
//     })
//     .error((error) => {
//       reject(error);
//     });
//   });
// };

  return{addUserProfile, getTimeAllottedEvents, updateEvent, getUserEvents, getSingleEventToEdit, deleteUserEvent, getEvents, addEventToUserProfile, getUserObject, addPreferencesToUserObject, getEventsByType};

});
