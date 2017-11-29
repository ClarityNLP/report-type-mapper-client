'use strict';

angular.module('myApp.institutes.edit', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/institutes/:instituteId/edit', {
    templateUrl: 'views/institutes/edit/edit.html',
    controller: 'InstitutesEditCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('InstitutesEditCtrl', ['$scope', 'lodash', '$http', '$routeParams', 'Services', '$location', 'userProfile', function($scope, lodash, $http, $routeParams, Services, $location, userProfile) {

  $scope.userProfile = userProfile;

  $scope.instituteAlreadyExists = false;

  getInstitute();

  function getInstitute() {
    Services.getInstitute($routeParams.instituteId).then(function onSuccess(response) {
      $scope.instituteName = response.data.name;
    }).catch(function onError(sailsResponse) {
      console.log('problem getting institute');
    }).finally(function eitherWay() {

    });
  }

  $scope.editInstitute = function() {
    Services.editInstitute({ name: $scope.instituteName, instituteId: $routeParams.instituteId }).then(function onSuccess(response) {
      $location.path('/institutes');
    }).catch(function onError(sailsResponse) {
      $scope.instituteAlreadyExists = true;
    }).finally(function eitherWay() {

    });
  }

}]);
