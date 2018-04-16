'use strict';

angular.module('myApp.list.create', [])

.controller('ListCreateCtrl', ['$scope', '$http', '$state', '$stateParams', 'userProfile', 'Services', 'EnvironmentConfig', 'toastr', function($scope, $http, $state, $stateParams, userProfile, Services, EnvironmentConfig, toastr) {

  $scope.userProfile = userProfile;

  $scope.instituteId = $stateParams.instituteId;

  $scope.isProcessing = false;

  $scope.createList = function() {
    $scope.isProcessing = true;
    var fd = new FormData();
    fd.append('name', $scope.list.name);
    fd.append('reportTypes', $scope.list.reportTypes);

    $http.post(EnvironmentConfig.API_URL+"/institutes/"+$stateParams.instituteId+"/lists", fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function(response) {
      // toastr.success(response.data.numCreatedGlobalTags+' Global Tags created.');
      // getTagCount();
      $state.go('app.list.all', { instituteId: $stateParams.instituteId });
    }).catch(function onError(response) {
      toastr.error(response.data.message);
    }).finally(function eitherWay() {
      $scope.isProcessing = false;
    });
  }

  // $scope.createList = function() {
  //
  //   var fd = new FormData();
  //   fd.append('name', $scope.list.name);
  //   fd.append('reportTypes', $scope.list.reportTypes);
  //
  //   $http.post(EnvironmentConfig.API_URL+"/institutes/"+$stateParams.instituteId+"/lists", fd, {
  //     transformRequest: angular.identity,
  //     headers: {'Content-Type': undefined}
  //   }).then(function(response) {
  //     $state.go('app.list.all', { instituteId: $stateParams.instituteId });
  //     // $location.path('/institutes/'+$stateParams.instituteId+'/lists');
  //   })
  // }

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

}])
