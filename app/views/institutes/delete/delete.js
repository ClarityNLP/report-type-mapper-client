'use strict';

angular.module('myApp.institutes.delete', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/institutes/:instituteId/delete', {
    templateUrl: 'views/institutes/delete/delete.html',
    controller: 'InstitutesDeleteCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('InstitutesDeleteCtrl', ['$scope', 'lodash', '$routeParams', 'userProfile', 'Services', '$location', function($scope, lodash, $routeParams, userProfile, Services, $location) {

  $scope.userProfile = userProfile;

  $scope.deleteInstitute = function() {
    Services.deleteInstitute($routeParams.instituteId).then(function onSuccess(response) {
      $location.path('/institutes');
    }).catch(function onError(sailsResponse) {
      console.log('problem deleting institute...');
    }).finally(function eitherWay() {

    });
  }

}]);
