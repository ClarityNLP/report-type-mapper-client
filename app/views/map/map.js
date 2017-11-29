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

.controller('MapCtrl', ['$scope', 'lodash', '$http', '$routeParams', 'userProfile', 'Services', function($scope, lodash, $http, $routeParams, userProfile, Services) {

  $scope.userProfile = userProfile;

  $scope.page = 0;

  $scope.loadMoreActive = false;

  // $scope.loadMoreVisible = false;

  var loadMoreElement = angular.element(document.querySelector('.load-next-page'));

  angular.element(document.querySelector('#report-type-list')).bind('scroll', function(){
    var loadMore = isScrolledIntoView(loadMoreElement);
    if (loadMore && $scope.loadMoreActive) {
      $scope.loadMoreActive = false;
      $scope.page = $scope.page + 1;

      var params = {
        instituteId: $routeParams.instituteId,
        listId: $routeParams.listId,
        page: $scope.page,
        query: $scope.query ? $scope.query : ''
      }

      Services.getReportTypes(params).then(function onSuccess(response) {
        _.forEach(response.data.reportTypes, function(value) {
          $scope.report_types.push(value);
        });

        if (response.data.reportTypes.length == 30) {
          $scope.loadMoreActive = true;
        } else {
          $scope.loadMoreActive = false;
        }
      }).catch(function onError(sailsResponse) {
        console.log('error');
      }).finally(function eitherWay() {
        console.log('either way...');
      });
      // $http.get('http://localhost:1337/institutes/'+$routeParams.instituteId+'/lists/'+$routeParams.listId+'/reportTypes?page='+$scope.page+'&query='+($scope.query ? $scope.query : ''))
      // .then(function onSuccess(response) {
      //   console.log('Response from loading more: ',response);
      //   // $scope.report_types = response.data;
      //   _.forEach(response.data, function(value) {
      //     $scope.report_types.push(value);
      //   });
      //
      //   if (response.data.length == 30) {
      //     $scope.loadMoreActive = true;
      //   } else {
      //     $scope.loadMoreActive = false;
      //   }
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
      //   // $scope.loginForm.loading = false;
      // })
    }
  });

  getReportTypes();
  getTags();

  function getReportTypes() {

    var params = {
      instituteId: $routeParams.instituteId,
      listId: $routeParams.listId,
      page: $scope.page,
      query: ''
    }

    Services.getReportTypes(params).then(function onSuccess(response) {
      $scope.numResults = response.data.numResults;
      $scope.report_types = response.data.reportTypes;
      if (response.data.reportTypes.length == 30) {
        $scope.loadMoreActive = true;
      } else {
        $scope.loadMoreActive = false;
      }
    }).catch(function onError(sailsResponse) {
      console.log('error');
    }).finally(function eitherWay() {

    });
  }

  function getTags() {
    Services.getTags().then(function onSuccess(response) {
      $scope.tags = response.data.tags;
    }).catch(function onError(sailsResponse) {
      console.log('problem getting tags.');
    }).finally(function eitherWay() {

    });
  }

  function isScrolledIntoView(el) {
      var el = el[0];
      var elemTop = el.getBoundingClientRect().top;
      var elemBottom = el.getBoundingClientRect().bottom;

      // Only completely visible elements return true:
      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      // Partially visible elements return true:
      isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
  }

  $scope.search = function(e) {
    $scope.page = 0;

    var params = {
      instituteId: $routeParams.instituteId,
      listId: $routeParams.listId,
      page: $scope.page,
      query: $scope.query
    }

    Services.getReportTypes(params).then(function onSuccess(response) {
      $scope.numResults = response.data.numResults;
      $scope.report_types = response.data.reportTypes;
      if (response.data.reportTypes.length == 30) {
        $scope.loadMoreActive = true;
      } else {
        $scope.loadMoreActive = false;
      }
    }).catch(function onError(sailsResponse) {
      console.log('error');
    }).finally(function eitherWay() {
      console.log('either way...');
    });

  }

  $scope.addTag = function(tag) {
    _.forEach($scope.report_types, function(report_type) {
      var hasTag = _.some(report_type.tags, {'id': tag.id});
      if (report_type.selected && !hasTag) {
        report_type.tags.push(tag);
        var params = {
          instituteId: $routeParams.instituteId,
          listId: $routeParams.listId,
          tagId: tag.id,
          reportTypeId: report_type.id
        }
        Services.addTag(params).then(function onSuccess(response) {

        }).catch(function onError(sailsResponse) {
          console.log('error');
        }).finally(function eitherWay() {

        });
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
          var params = {
            instituteId: $routeParams.instituteId,
            listId: $routeParams.listId,
            tagId: tag_id,
            reportTypeId: report_type_id
          }
          Services.removeTag(params).then(function onSuccess(response) {

          }).catch(function onError(sailsResponse) {
            console.log('error');
          }).finally(function eitherWay() {

          });
        }
      }
    });
  }


}]);
