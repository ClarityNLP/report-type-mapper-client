'use strict';

angular.module('myApp.users.delete', [])

.controller('UsersDeleteCtrl', ['$scope', '$http', 'userProfile', 'Services', '$stateParams', '$state', function($scope, $http, userProfile, Services, $stateParams, $state) {

  $scope.userProfile = userProfile;

  $scope.userId = $stateParams.userId;

  $scope.deleteUser = function(userId) {
    console.log('userId: ',userId);
    Services.deleteUser(userId).then(function onSuccess(response) {
      $state.go('app.users.all');
    }).catch(function onError(sailsResponse) {
    }).finally(function eitherWay() {
    });
  }

  // getToken();
  //
  // function getToken() {
  //   Services.getToken().then(function onSuccess(response) {
  //     $scope.apiToken = response.data;
  //   }).catch(function onError(sailsResponse) {
  //   }).finally(function eitherWay() {
  //   });
  // }
}]);
