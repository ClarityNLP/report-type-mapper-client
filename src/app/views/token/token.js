'use strict';

angular.module('myApp.token', [])

.controller('TokenCtrl', ['$scope', '$http', 'userProfile', 'Services', function($scope, $http, userProfile, Services) {

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
