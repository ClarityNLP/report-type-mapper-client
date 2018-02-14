'use strict';

angular.module('myApp.token', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/token', {
    templateUrl: 'views/token/token.html',
    controller: 'TokenCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('TokenCtrl', ['$scope', 'lodash', '$http', '$routeParams', 'userProfile', 'Services', 'config', function($scope, lodash, $http, $routeParams, userProfile, Services, config) {

  $scope.userProfile = userProfile;
  
  getToken();

  function getToken() {
    Services.getToken().then(function onSuccess(response) {
      $scope.apiToken = response.data;
    }).catch(function onError(sailsResponse) {
    }).finally(function eitherWay() {
    });
  }
}]);
