'use strict';

angular.module('myApp.logout', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logout', {
    templateUrl: 'views/logout/logout.html',
    controller: 'LogoutCtrl',
    resolve: {
      userProfile: "UserProfile"
    }
  });
}])

.controller('LogoutCtrl', ['$scope', 'lodash', '$http', 'toastr', '$location', 'userProfile', 'Auth', function($scope, lodash, $http, toastr, $location, userProfile, Auth) {

  logout();

  function logout() {

    Auth.logout().then(function() {
      return userProfile.$refresh();
    });

  }

}]);
