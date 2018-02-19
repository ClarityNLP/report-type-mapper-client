'use strict';

angular.module('myApp.institutes.create', ['bootstrap.fileField'])

.controller('InstitutesCreateCtrl', ['$scope', '$state', 'userProfile', 'Services', function($scope, $state, userProfile, Services) {

  $scope.userProfile = userProfile;

  $scope.instituteAlreadyExists = false;

  $scope.createInstitute = function() {
    Services.createInstitute($scope.instituteName).then(function onSuccess(response) {
      $scope.instituteAlreadyExists = false;
      $scope.instituteName = '';
      $state.go('app.institutes.all');
    }).catch(function onError(sailsResponse) {
      $scope.instituteAlreadyExists = true;
    }).finally(function eitherWay() {

    });
  }

}]);
