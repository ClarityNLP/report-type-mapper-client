'use strict';

angular.module('myApp.login', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl',
    resolve: {
      userProfile: "UserProfile"
    }
  });
}])

.controller('LoginCtrl', ['$scope', 'lodash', '$http', 'toastr', '$location', 'userProfile', 'Auth', function($scope, lodash, $http, toastr, $location, userProfile, Auth) {

  $scope.loginForm = {
    loading: false
  }

  $scope.submitLoginForm = function() {

    $scope.loginForm.loading = true;
    Auth.signIn($scope.loginForm.credentials).then(function() {
      return userProfile.$refresh();
    }).then(function() {
      $location.path('/institutes/'+userProfile.institute.id+'/lists');
    })

    // $http.post('http://localhost:1337/login', {
    //   email: $scope.loginForm.email,
    //   password: $scope.loginForm.password
    // })
    // .then(function onSuccess() {
    //   $location.path('/');
    // })
    // .catch(function onError(sailsResponse) {
    //   if (sailsResponse.status === 400 || 404) {
    //     toastr.error('Invalid email/password combination.', 'Error', {
    //       closeButton: true
    //     });
    //     return;
    //   }
    //   toastr.error('An unexpected error occurred, please try again', 'Error', {
    //     closeButton: true
    //   });
    //   return;
    // })
    // .finally(function eitherWay() {
    //   $scope.loginForm.loading = false;
    // })
  }

}]);
