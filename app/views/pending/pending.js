'use strict';

angular.module('myApp.pending', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pending', {
    templateUrl: 'views/pending/pending.html',
    controller: 'PendingCtrl',
    resolve: {
      userProfile: "UserProfile"
    }
  });
}])

.controller('PendingCtrl', ['$scope', 'lodash', '$http', 'toastr', '$location', 'userProfile', 'Auth', function($scope, lodash, $http, toastr, $location, userProfile, Auth) {

  console.log('loading pending ctrl.');

}]);
