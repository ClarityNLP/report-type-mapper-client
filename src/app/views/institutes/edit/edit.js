'use strict';

angular.module('myApp.institutes.edit', [])

.controller('InstitutesEditCtrl', ['$scope', '$stateParams', 'Services', '$state', 'userProfile', function($scope, $stateParams, Services, $state, userProfile) {

  $scope.userProfile = userProfile;

  $scope.instituteAlreadyExists = false;

  getInstitute();

  function getInstitute() {
    Services.getInstitute($stateParams.instituteId).then(function onSuccess(response) {
      $scope.instituteName = response.data.name;
    }).catch(function onError(sailsResponse) {
      console.log('problem getting institute');
    }).finally(function eitherWay() {

    });
  }

  $scope.editInstitute = function() {
    Services.editInstitute({ name: $scope.instituteName, instituteId: $stateParams.instituteId }).then(function onSuccess(response) {
      $state.go('app.institutes.all');
    }).catch(function onError(sailsResponse) {
      $scope.instituteAlreadyExists = true;
    }).finally(function eitherWay() {

    });
  }

}]);
