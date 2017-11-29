angular.module('myApp.Auth', [])

.service("Auth", ["$http", function ($http) {

  this.getProfile = function () {
    return $http.get("http://localhost:1337/me");
  };

  this.signIn = function(credentials) {
    return $http.post("http://localhost:1337/login", credentials).then(function (response) {
      // authentication succeeded, store the response access token somewhere (if any)
    });
  };

  this.signUp = function(params) {
    return $http.post("http://localhost:1337/signup", params);
  }

  this.logout = function() {
    return $http.get("http://localhost:1337/logout");
  };

}])
