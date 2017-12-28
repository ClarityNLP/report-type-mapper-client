'use strict';

angular.module('myApp.list.create', ['ngRoute', 'ngLodash', 'bootstrap.fileField'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/institutes/:instituteId/lists/create', {
    templateUrl: 'views/list/create/create.html',
    controller: 'ListCreateCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('ListCreateCtrl', ['$scope', 'lodash', '$http', '$location', '$routeParams', 'userProfile', 'Services', function($scope, lodash, $http, $location, $routeParams, userProfile, Services) {

  $scope.userProfile = userProfile;

  $scope.instituteId = $routeParams.instituteId;

  getInstituteName();

  function getInstituteName() {
    Services.getInstituteName($routeParams.instituteId).then(function onSuccess(response) {
      $scope.instituteName = response.data
      console.log('response: ',response);
    }).catch(function onError(sailsResponse) {
      console.log('problem getting institute name.');
    }).finally(function eitherWay() {
    });
  }

  $scope.createList = function() {

    var fd = new FormData();
    fd.append('name', $scope.list.name);
    fd.append('reportTypes', $scope.list.reportTypes);

    $http.post("http://localhost:1337/institutes/"+$routeParams.instituteId+"/lists", fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function(response) {
      console.log('response: ',response);
      $location.path('/institutes/'+$routeParams.instituteId+'/lists');
    })
  }

}])

.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
