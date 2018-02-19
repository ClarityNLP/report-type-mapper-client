'use strict';

angular.module('myApp.users.all', [])

.controller('UsersAllCtrl', ['$scope', '$http', 'userProfile', 'Services', 'toastr', function($scope, $http, userProfile, Services, toastr) {

  $scope.userProfile = userProfile;

  $scope.activateUser = function(user) {
    console.log('user: ',user);
    Services.activateUser(user).then(function onSuccess(response) {
      console.log('response: ',response);
      $scope.users.forEach(function(scopeUser) {
        if (scopeUser.id == user.id) {
          scopeUser.roles = response.data.roles;
          // if (user.activated) {
          //   var index = scopeUser.roles.indexOf('ROLE_PENDING_USER');
          //   scopeUser.roles.splice(index, 1);
          // } else {
          //   scopeUser.roles.push('ROLE_PENDING_USER');
          // }
        }
      });
      if (user.activated) {
        toastr.success('User has been activated and notified via email.');
      } else {
        toastr.success('User has been deactivated and notified via email.');
      }
    }).catch(function onError(sailsResponse) {
    }).finally(function eitherWay() {
    });
  }

  getUsers();

  function getUsers() {
    Services.getUsers().then(function onSuccess(response) {
      var users = response.data;
      users.forEach(function(user) {
        user.activated = user.roles.indexOf('ROLE_PENDING_USER') < 0;
      });
      $scope.users = users;
    }).catch(function onError(sailsResponse) {
    }).finally(function eitherWay() {
    });
  }
}]);
