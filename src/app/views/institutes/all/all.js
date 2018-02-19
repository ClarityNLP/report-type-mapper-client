'use strict';

angular.module('myApp.institutes.all', [])

.controller('InstitutesAllCtrl', ['$scope', 'userProfile', 'Services', function($scope, userProfile, Services) {

  $scope.userProfile = userProfile;

  Services.getInstitutes().then(function onSuccess(response) {
    console.log('success getting institutes...');
    $scope.institutes = response.data;
  }).catch(function onError(sailsResponse) {
    console.log('error');
  }).finally(function eitherWay() {

  });

}]);
