'use strict';

angular.module('myApp.map', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/institutes/:instituteId/lists/:listId/map', {
    templateUrl: 'views/map/map.html',
    controller: 'MapCtrl',
    resolve: {
      access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      userProfile: "UserProfile"
    }
  });
}])

.controller('MapCtrl', ['$scope', 'lodash', '$http', '$routeParams', 'userProfile', function($scope, lodash, $http, $routeParams, userProfile) {

  $scope.userProfile = userProfile;
  // getReportTypes();
  //
  // $scope.report_types = [];
  function getReportTypes() {

    // $scope.reportTypes.loading = true;

    $http.get('http://localhost:1337/institutes/'+$routeParams.instituteId+'/lists/'+$routeParams.listId+'/reportTypes')
    .then(function onSuccess(response) {
      // $location.path('/');
      console.log('response: ',response);
      $scope.report_types = response.data;
    })
    .catch(function onError(sailsResponse) {
      if (sailsResponse.status === 400 || 404) {
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
        return;
      }
      toastr.error('An unexpected error occurred, please try again', 'Error', {
        closeButton: true
      });
      return;
    })
    .finally(function eitherWay() {
      // $scope.loginForm.loading = false;
    })
  }

  $scope.report_types = [{
    'id': '1',
    'name': 'X-ray',
    'selected': true,
    'tags': [{
      'id': '10',
      'name': 'Healthcare'
    }, {
      'id': '20',
      'name': 'Pharmacy'
    }]
  }, {
    'id': '2',
    'name': 'Radiology',
    'selected': false,
    'tags': [{
      'id': '10',
      'name': 'Healthcare'
    }]
  }, {
    'id': '3',
    'name': 'Acupuncture',
    'selected': false,
    'tags': []
  }, {
    'id': '4',
    'name': 'Dermatology',
    'selected': false,
    'tags': []
  }, {
    'id': '5',
    'name': 'Surgery',
    'selected': false,
    'tags': []
  }];

  $scope.tags = [{
    'id': '10',
    'name': 'Healthcare'
  }, {
    'id': '20',
    'name': 'Pharmacy'
  }, {
    'id': '30',
    'name': 'Health'
  }, {
    'id': '40',
    'name': 'More Health'
  }];

  $scope.addTag = function(tag) {
    _.forEach($scope.report_types, function(report_type) {
      var hasTag = _.some(report_type.tags, {'id': tag.id});
      if (report_type.selected && !hasTag) {
        report_type.tags.push(tag);
      }
    });
  }

  $scope.selectReportType = function(report_type) {
    if (report_type.selected) {
      _.forEach($scope.tags, function(tag) {
        tag.selected = false;
      });
    }
  }

  $scope.deleteTag = function(report_type_id, tag_id) {
    _.forEach($scope.report_types, function(report_type) {
      if (report_type.id == report_type_id) {
        var hasTag = _.some(report_type.tags, {'id': tag_id});
        if (hasTag) {
          _.remove(report_type.tags, {id: tag_id});
        }
      }
    });
  }


}]);
