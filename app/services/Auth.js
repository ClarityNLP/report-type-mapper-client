angular.module('myApp.Auth', [])

.service("Auth", ["$http", "config", function ($http, config) {

  this.getProfile = function () {
    return $http.get(config.API_URL+"/me");
  };

  this.signIn = function(credentials) {
    return $http.post(config.API_URL+"/login", credentials).then(function (response) {
      // authentication succeeded, store the response access token somewhere (if any)
    });
  };

  this.signUp = function(params) {
    return $http.post(config.API_URL+"/signup", params);
  }

  this.logout = function() {
    return $http.get(config.API_URL+"/logout");
  };

}])
