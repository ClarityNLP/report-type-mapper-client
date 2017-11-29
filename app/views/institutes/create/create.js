'use strict';

angular.module('myApp.institutes.create', ['ngRoute', 'ngLodash', 'bootstrap.fileField'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/institutes/create', {
    templateUrl: 'views/institutes/create/create.html',
    controller: 'InstitutesCreateCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('InstitutesCreateCtrl', ['$scope', 'lodash', '$http', '$location', '$routeParams', 'userProfile', 'Services', function($scope, lodash, $http, $location, $routeParams, userProfile, Services) {

  $scope.userProfile = userProfile;

  $scope.instituteAlreadyExists = false;

  $scope.createInstitute = function() {
    Services.createInstitute($scope.instituteName).then(function onSuccess(response) {
      $scope.instituteAlreadyExists = false;
      $scope.instituteName = '';
      $location.path('/institutes');
    }).catch(function onError(sailsResponse) {
      $scope.instituteAlreadyExists = true;
    }).finally(function eitherWay() {

    });
  }

}]);
