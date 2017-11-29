'use strict';

angular.module('myApp.institutes.all', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  $routeProvider.when('/institutes', {
    templateUrl: 'views/institutes/all/all.html',
    controller: 'InstitutesAllCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('InstitutesAllCtrl', ['$scope', 'lodash', '$http', '$routeParams', 'userProfile', 'Services', function($scope, lodash, $http, $routeParams, userProfile, Services) {

  $scope.userProfile = userProfile;

  console.log('userProfile: ',userProfile);

  Services.getInstitutes().then(function onSuccess(response) {
    console.log('success getting institutes...');
    $scope.institutes = response.data;
  }).catch(function onError(sailsResponse) {
    console.log('error');
  }).finally(function eitherWay() {

  });

}]);
