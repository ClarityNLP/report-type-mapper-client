'use strict';

angular.module('myApp.login', [])

.controller('LoginCtrl', ['$scope', '$state', '$stateParams', 'userProfile', 'Auth', function($scope, $state, $stateParams, userProfile, Auth) {

  $scope.loginForm = {
    loading: false
  }

  $scope.message = $stateParams.message;

  $scope.submitLoginForm = function() {

    $scope.loginForm.loading = true;
    Auth.signIn($scope.loginForm.credentials).then(function onSuccess() {
      return userProfile.$refresh();
    }).then(function() {
      if (userProfile.$hasRole('ROLE_ADMIN')) {
        console.log("is admin...");
        $state.go('app.institutes.all');
      } else {
        console.log("is not admin...");
        $state.go('app.lists.all', { instituteId: userProfile.institute.id });
      }
    }).catch(function onError() {
      $scope.loginForm.loading = false;
      $scope.loginForm.errors = "Please enter correct email/password";
    });
  }

}]);
