'use strict';

angular.module('myApp.list.edit', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('institute/:instituteId/list/:listId/edit', {
    templateUrl: 'views/list/edit/edit.html',
    controller: 'ListEditCtrl'
  });
}])

.controller('ListEditCtrl', ['$scope', 'lodash', '$http', '$routeParams', function($scope, lodash, $http, $routeParams) {

  console.log('list edit ctrl...');

}]);
