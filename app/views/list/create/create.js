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

.controller('ListCreateCtrl', ['$scope', 'lodash', '$http', '$location', '$routeParams', 'userProfile', function($scope, lodash, $http, $location, $routeParams, userProfile) {

  $scope.userProfile = userProfile;

  $scope.createList = function() {

    console.log('name from scope: ',$scope.list.name);
    console.log('file form scope: ',$scope.list.reportTypes);

    var fd = new FormData();

    //you can also send other fields
    //this will be available as req.body.title
    //NOTE: files must be added AFTER other form data
    fd.append('name', $scope.list.name);

    //nacho relates to what we called the file
    //in the api on sails
    fd.append('reportTypes', $scope.list.reportTypes);

    console.log('fd: ',fd);

    $http.post("http://localhost:1337/insitutes/"+userProfile.institute.id+"/lists", fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function(response) {
      console.log('response: ',response);
      $location.path('/institutes/'+userProfile.institute.id+'/lists');
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
