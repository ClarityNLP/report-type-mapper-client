'use strict';

angular.module('myApp.logout', [])

.controller('LogoutCtrl', ['$scope', 'userProfile', 'Auth', function($scope, userProfile, Auth) {

  logout();

  function logout() {

    Auth.logout().then(function() {
      return userProfile.$refresh();
    });

  }

}]);
