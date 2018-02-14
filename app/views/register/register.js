'use strict';

angular.module('myApp.register', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'views/register/register.html',
    controller: 'RegisterCtrl',
    resolve: {
      userProfile: "UserProfile"
    }
  });
}])

.controller('RegisterCtrl', ['$scope', 'lodash', 'Services', 'Auth', 'userProfile', '$location', function($scope, lodash, Services, Auth, userProfile, $location) {

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
      $location.path('/institutes/'+userProfile.institute.id+'/lists');
    }).catch(function onError(response) {
      if (response.status == 400) {
        $scope.registerForm.errors = "Please enter all required fields";
      } else {
        $scope.registerForm.errors = "There was an unexpected problem. Please try again.";
      }
    });

  }

}]);
