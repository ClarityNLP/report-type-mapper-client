'use strict';

angular.module('myApp.list.all', [])

.controller('ListAllCtrl', ['$scope', '$http', '$stateParams', 'userProfile', 'Services', 'EnvironmentConfig', function($scope, $http, $stateParams, userProfile, Services, EnvironmentConfig) {

  $scope.userProfile = userProfile;

  $scope.instituteId = $stateParams.instituteId;

  getInstituteName();

  function getInstituteName() {
    Services.getInstituteName($stateParams.instituteId).then(function onSuccess(response) {
      $scope.instituteName = response.data
      console.log('response: ',response);
    }).catch(function onError(sailsResponse) {
      console.log('problem getting institute name.');
    }).finally(function eitherWay() {
    });
  }

  $http.get(EnvironmentConfig.API_URL+'/institutes/'+$stateParams.instituteId+'/lists')
  .then(function onSuccess(response) {
    $scope.lists = response.data;
  })
  .catch(function onError(response) {
    toastr.error('An unexpected error occurred, please try again', 'Error', {
      closeButton: true
    });
    return;
  })
  .finally(function eitherWay() {

  })

}]);
