'use strict';

angular.module('myApp.institutes.delete', [])

.controller('InstitutesDeleteCtrl', ['$scope', '$stateParams', 'userProfile', 'Services', '$state', function($scope, $stateParams, userProfile, Services, $state) {

  $scope.userProfile = userProfile;

  $scope.deleteInstitute = function() {
    Services.deleteInstitute($stateParams.instituteId).then(function onSuccess(response) {
      $state.go('app.institute');
    }).catch(function onError(sailsResponse) {
      console.log('problem deleting institute...');
    }).finally(function eitherWay() {

    });
  }

}]);
