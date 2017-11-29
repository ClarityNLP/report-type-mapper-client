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

.controller('RegisterCtrl', ['$scope', 'lodash', '$http', 'Services', 'Auth', 'userProfile', '$location', function($scope, lodash, $http, Services, Auth, userProfile, $location) {

  getInstitutes();

  function getInstitutes() {
    Services.getInstitutes().then(function onSuccess(response) {
      $scope.institutes = response.data;
      console.log('response: ',response);
    }).catch(function onError(sailsResponse) {
      console.log('problem getting institutes...');
    }).finally(function eitherWay() {

    });
  }

  $scope.register = function() {

    Auth.signUp($scope.registerForm).then(function() {
      return userProfile.$refresh();
    }).then(function() {
      $location.path('/institutes/'+userProfile.institute.id+'/lists');
    })

  }

}]);
