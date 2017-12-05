"use strict";

app.factory("UserFactory", function () {

  let userObj = null;

  return {
      setUserObj:function (userObjFromDOM) {
        userObj = userObjFromDOM;
      },
      getUserObj:function () {
          return userObj.name;
      }
  };
});
