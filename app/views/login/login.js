'use strict';

angular.module('myApp.login', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', 'lodash', '$http', function($scope, lodash, $http) {

  console.log('in login ctrl...');

}]);
