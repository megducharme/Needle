"use strict";

app.controller("LoginCtrl", function($scope, $window, AuthFactory ) {
  $scope.account = {
    email: "",
    password: ""
  };

  $scope.register = () => {
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then( (userData) => {
      console.log("you're a new user", userData.uid );
      // $scope.login();
      if (userData) {
        $window.location.href = "#/createAccount";
      } else {
        $window.location.href = "#/login";
      }
      console.log("data from login - register", userData);
    }, (error) => {
      console.log("there's an error creating the user", error);
  });
};

  $scope.login = () => {
    AuthFactory.loginUser($scope.account)
      .then( (data) => {
        console.log("a user has logged in ", data.uid);
        if (data) {
          $window.location.href = "#/myEvents";
        } else {
          $window.location.href = "#/login";
        }
        console.log("data from login ", data);
      }, (error) => {
        console.log("there's an error logging in");
      });
  };

      $scope.loginWithGoogle = () =>{
        AuthFactory.loginGoogle($scope.account)
        .then((data)=> {
         if (data) {
          $window.location.href = "#/createAccount";
        } else {
          $window.location.href = "#/login";
        }
        console.log("data from login ", data);
      }, (error) => {
        console.log("there's an error logging in");
      });

  };
});
