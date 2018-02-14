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

.controller('LoginCtrl', ['$scope', 'lodash', 'toastr', '$location', 'userProfile', 'Auth', function($scope, lodash, toastr, $location, userProfile, Auth) {

  $scope.loginForm = {
    loading: false
  }

  $scope.submitLoginForm = function() {

    $scope.loginForm.loading = true;
    Auth.signIn($scope.loginForm.credentials).then(function onSuccess() {
      return userProfile.$refresh();
    }).then(function() {
      if (userProfile.$hasRole('ROLE_ADMIN')) {
        $location.path('/institutes');
      } else {
        $location.path('/institutes/'+userProfile.institute.id+'/lists');
      }
    }).catch(function onError() {
      $scope.loginForm.loading = false;
      $scope.loginForm.errors = "Please enter correct email/password";
    });
  }

}]);
