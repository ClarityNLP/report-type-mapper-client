angular.module('myApp.Auth', [])

.service("Auth", ["$http", "EnvironmentConfig", function ($http, EnvironmentConfig) {



  this.getProfile = function () {
    return $http.get(EnvironmentConfig.API_URL+"/me");
  };

  this.signIn = function(credentials) {
    return $http.post(EnvironmentConfig.API_URL+"/login", credentials).then(function (response) {
      // authentication succeeded, store the response access token somewhere (if any)
    });
  };

  this.signUp = function(params) {
    return $http.post(EnvironmentConfig.API_URL+"/signup", params);
  }

  this.logout = function() {
    return $http.get(EnvironmentConfig.API_URL+"/logout");
  };

}])
