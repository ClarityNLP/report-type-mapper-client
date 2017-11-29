'use strict';

angular.module('myApp.list.delete', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('institute/:instituteId/list/:listId/delete', {
    templateUrl: 'views/list/delete/delete.html',
    controller: 'ListDeleteCtrl'
  });
}])

.controller('ListDeleteCtrl', ['$scope', 'lodash', '$http', '$routeParams', function($scope, lodash, $http, $routeParams) {

  //TODO

}]);
