'use strict';

angular.module('myApp.register', [])

.controller('RegisterCtrl', ['$scope', 'Services', 'Auth', 'userProfile', '$state', function($scope, Services, Auth, userProfile, $state) {

  getInstitutes();

  $scope.registerForm = {};

  function getInstitutes() {
    Services.getInstitutes().then(function onSuccess(response) {
      $scope.institutes = response.data;
      $scope.registerForm.selectedInstitute = response.data[0];
    }).catch(function onError(response) {
      console.log('error: ',response);
    }).finally(function eitherWay() {
    });
  }

  $scope.register = function() {
    Auth.signUp($scope.registerForm).then(function onSuccess(response) {
      return userProfile.$refresh();
    }).then(function() {
      $state.go('app.pending');
    }).catch(function onError(response) {
      if (response.status == 400) {
        $scope.registerForm.errors = "Please enter all required fields";
      } else {
        $scope.registerForm.errors = "There was an unexpected problem. Please try again.";
      }
    });

  }

}]);
