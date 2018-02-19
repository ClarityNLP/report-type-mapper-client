'use strict';

angular.module('myApp.list.create', ['bootstrap.fileField'])

.controller('ListCreateCtrl', ['$scope', '$http', '$state', '$stateParams', 'userProfile', 'Services', 'EnvironmentConfig', function($scope, $http, $state, $stateParams, userProfile, Services, EnvironmentConfig) {

  $scope.userProfile = userProfile;

  $scope.instituteId = $stateParams.instituteId;

  getInstituteName();

  function getInstituteName() {
    Services.getInstituteName($stateParams.instituteId).then(function onSuccess(response) {
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

    $http.post(EnvironmentConfig.API_URL+"/institutes/"+$stateParams.instituteId+"/lists", fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function(response) {
      $state.go('app.list.all', { instituteId: $stateParams.instituteId });
      // $location.path('/institutes/'+$stateParams.instituteId+'/lists');
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
