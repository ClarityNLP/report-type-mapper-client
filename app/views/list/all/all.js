'use strict';

angular.module('myApp.list.all', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  $routeProvider.when('/institutes/:instituteId/lists', {
    templateUrl: 'views/list/all/all.html',
    controller: 'ListAllCtrl',
    // resolve: {
    //   // isAuthed: function() {
    //   //   if (!localStorageServiceProvider.get('isAuthed')) {
    //   //     $location.path('/#!/login');
    //   //   };
    //   // }
    // }
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('ListAllCtrl', ['$scope', 'lodash', '$http', '$routeParams', 'userProfile', function($scope, lodash, $http, $routeParams, userProfile) {

  $scope.userProfile = userProfile;

  $http.get('http://localhost:1337/institutes/'+$routeParams.instituteId+'/lists')
  .then(function onSuccess(response) {
    console.log('lists: ',response);
    $scope.lists = response.data;
    // $location.path('/');
  })
  .catch(function onError(response) {
    toastr.error('An unexpected error occurred, please try again', 'Error', {
      closeButton: true
    });
    return;
  })
  .finally(function eitherWay() {
    // $scope.loginForm.loading = false;
  })

}]);
