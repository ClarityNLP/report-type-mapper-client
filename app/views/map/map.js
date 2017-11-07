'use strict';

angular.module('myApp.map', ['ngRoute', 'ngLodash'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'views/map/map.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'lodash', '$http', function($scope, lodash, $http) {
  console.log('in view1 controller...',$scope);
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
  }];

  $scope.tags = [{
    'id': '10',
    'name': 'Healthcare'
  }, {
    'id': '20',
    'name': 'Pharmacy'
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

  $scope.callTest1 = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:1337/test1'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("success response: ",response);
      }, function errorCallback(response) {
        console.log("error response: ",response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

  $scope.callTest2 = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:1337/test2'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("success response: ",response);
      }, function errorCallback(response) {
        console.log("error response: ",response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }


}]);
