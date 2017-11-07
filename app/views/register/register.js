'use strict';

angular.module('myApp.register', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'views/register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope', 'lodash', '$http', function($scope, lodash, $http) {

  console.log('in register ctrl...');

}]);
