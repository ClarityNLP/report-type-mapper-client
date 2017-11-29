'use strict';

angular.module('myApp.login', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl',
    resolve: {
      userProfile: "UserProfile"
    }
  });
}])

.controller('LoginCtrl', ['$scope', 'lodash', '$http', 'toastr', '$location', 'userProfile', 'Auth', function($scope, lodash, $http, toastr, $location, userProfile, Auth) {

  $scope.loginForm = {
    loading: false
  }

  $scope.submitLoginForm = function() {

    $scope.loginForm.loading = true;
    Auth.signIn($scope.loginForm.credentials).then(function() {
      return userProfile.$refresh();
    }).then(function() {
      $location.path('/institutes/'+userProfile.institute.id+'/lists');
    });
  }

}]);
