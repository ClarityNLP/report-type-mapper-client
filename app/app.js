'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'toastr',
  'LocalStorageModule',
  'myApp.map',
  'myApp.tag',
  'myApp.login',
  'myApp.logout',
  'myApp.register',
  'myApp.version',
  'myApp.list',
  'myApp.institutes',
  'myApp.Access',
  'myApp.Auth',
  'myApp.services',
  'myApp.UserProfile'
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');
  $httpProvider.defaults.withCredentials = true;
  $routeProvider.otherwise({redirectTo: '/login'});
}]).
run(["$rootScope", "Access", "$location", "$log", function ($rootScope, Access, $location, $log) {

  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
    switch (rejection) {

    case Access.UNAUTHORIZED:
      $location.path("/login");
      break;

    case Access.FORBIDDEN:
      $location.path("/forbidden");
      break;

    default:
      $log.warn("$routeChangeError event catched");
      break;

    }
  });

}])
