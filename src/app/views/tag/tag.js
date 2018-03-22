'use strict';

angular.module('myApp.tag', [])

.controller('TagCtrl', ['$scope', '$http', 'userProfile', 'Services', 'EnvironmentConfig', 'toastr', function($scope, $http, userProfile, Services, EnvironmentConfig, toastr) {

  $scope.userProfile = userProfile;

  $scope.tagAlreadyExists = false;

  $scope.fileFormat = 'simple';

  $scope.isProcessing = false;

  $scope.createTags = function() {
    $scope.isProcessing = true;
    var fd = new FormData();
    fd.append('tagFile', $scope.tagFile);
    fd.append('fileFormat', $scope.fileFormat);

    $http.post(EnvironmentConfig.API_URL+"/uploadLoincDocumentOntologyCSV", fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function(response) {
      toastr.success(response.data.numCreatedGlobalTags+' Global Tags created.');
      getTagCount();
    }).catch(function onError(response) {
      toastr.error(response.data.message);
    }).finally(function eitherWay() {
      $scope.isProcessing = false;
    });
  }

  $scope.createTag = function() {
    Services.createTag($scope.tagName).then(function onSuccess(response) {
      $scope.numTags = $scope.numTags + 1;
      $scope.tagAlreadyExists = false;
      $scope.tagName = '';
    }).catch(function onError(sailsResponse) {
      $scope.tagAlreadyExists = true;
    }).finally(function eitherWay() {

    });
  }

  getTagCount();

  function getTagCount() {
    Services.getTagCount().then(function onSuccess(response) {
      console.log('tag count: ',response);
      $scope.numTags = response.data.count;
    }).catch(function onError(sailsResponse) {
      console.log('problem getting tag count');
    }).finally(function eitherWay() {

    });
  }


}]);
