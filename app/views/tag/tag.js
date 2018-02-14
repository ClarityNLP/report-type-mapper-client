'use strict';

angular.module('myApp.tag', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tags', {
    templateUrl: 'views/tag/tag.html',
    controller: 'TagCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('TagCtrl', ['$scope', 'lodash', '$http', '$routeParams', 'userProfile', 'Services', 'config', function($scope, lodash, $http, $routeParams, userProfile, Services, config) {

  $scope.userProfile = userProfile;

  $scope.tagAlreadyExists = false;

  $scope.fileFormat = 'simple';

  $scope.createTags = function() {
    var fd = new FormData();
    fd.append('tagFile', $scope.tagFile);
    fd.append('fileFormat', $scope.fileFormat);

    $http.post(config.API_URL+"/uploadLoincDocumentOntologyCSV", fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function(response) {
      console.log('upload success...');
      console.log('response: ',response);
      // $location.path('/institutes/'+userProfile.institute.id+'/lists');
    })
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
