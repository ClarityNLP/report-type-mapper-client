'use strict';

angular.module('myApp.nav', [])

.controller('NavCtrl', ['$scope', 'userProfile', function($scope, userProfile) {

  $scope.userProfile = userProfile;

}]);
