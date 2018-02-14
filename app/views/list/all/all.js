'use strict';

angular.module('myApp.list.all', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  $routeProvider.when('/institutes/:instituteId/lists', {
    templateUrl: 'views/list/all/all.html',
    controller: 'ListAllCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('ListAllCtrl', ['$scope', 'lodash', '$http', '$routeParams', 'userProfile', 'Services', 'config', function($scope, lodash, $http, $routeParams, userProfile, Services, config) {

  $scope.userProfile = userProfile;

  $scope.instituteId = $routeParams.instituteId;

  getInstituteName();

  function getInstituteName() {
    Services.getInstituteName($routeParams.instituteId).then(function onSuccess(response) {
      $scope.instituteName = response.data
      console.log('response: ',response);
    }).catch(function onError(sailsResponse) {
      console.log('problem getting institute name.');
    }).finally(function eitherWay() {
    });
  }

  $http.get(config.API_URL+'/institutes/'+$routeParams.instituteId+'/lists')
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
