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

.controller('MapCtrl', ['$scope', 'lodash', '$routeParams', 'userProfile', 'Services', function($scope, lodash, $routeParams, userProfile, Services) {

  $scope.userProfile = userProfile;

  $scope.reportTypePage = 0;

  $scope.loadMoreActive = false;

  // $scope.loadMoreVisible = false;

  var loadMoreElement = angular.element(document.querySelector('.load-next-page'));

  angular.element(document.querySelector('#report-type-list')).bind('scroll', function(){
    var loadMore = isScrolledIntoView(loadMoreElement);
    console.log('loadMore: ',loadMore);
    if (loadMore && $scope.loadMoreActive) {
      $scope.loadMoreActive = false;
      $scope.reportTypePage = $scope.reportTypePage + 1;

      var params = {
        instituteId: $routeParams.instituteId,
        listId: $routeParams.listId,
        reportTypePage: $scope.reportTypePage,
        reportTypeQuery: $scope.reportTypeQuery ? $scope.reportTypeQuery : ''
      }

      console.log('params: ',params);

      Services.getReportTypes(params).then(function onSuccess(response) {
        _.forEach(response.data.reportTypes, function(value) {
          $scope.report_types.push(Object.assign({},value, {selected: $scope.isAllSelected}));
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
    }
  });

  getReportTypes();
  getTags();

  function getReportTypes() {

    var params = {
      instituteId: $routeParams.instituteId,
      listId: $routeParams.listId,
      reportTypePage: $scope.reportTypePage,
      reportTypeQuery: ''
    }

    Services.getReportTypes(params).then(function onSuccess(response) {
      $scope.numReportTypeResults = response.data.numResults;
      console.log('response: ',response);
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

    var params = {
      instituteId: $routeParams.instituteId,
      listId: $routeParams.listId,
      // tagPage: $scope.tagPage,
      tagQuery: ''
    }

    Services.getTags(params).then(function onSuccess(response) {
      $scope.numTagResults = response.data.numResults;
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
      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight + 5); //fix the plus 5
      // Partially visible elements return true:
      isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
  }

  $scope.searchReportType = function(e) {
    $scope.isAllSelected = false;

    $scope.reportTypePage = 0;

    var params = {
      instituteId: $routeParams.instituteId,
      listId: $routeParams.listId,
      reportTypePage: $scope.reportTypePage,
      reportTypeQuery: $scope.reportTypeQuery
    }

    Services.getReportTypes(params).then(function onSuccess(response) {
      $scope.numReportTypeResults = response.data.numResults;
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

  $scope.searchTag = function(e) {
    // $scope.reportTypePage = 0;
    console.log('search tag...');

    var params = {
      instituteId: $routeParams.instituteId,
      listId: $routeParams.listId,
      // reportTypePage: $scope.reportTypePage,
      tagQuery: $scope.tagQuery
    }

    Services.getTags(params).then(function onSuccess(response) {
      $scope.numTagResults = response.data.numResults;
      $scope.tags = response.data.tags;
    }).catch(function onError(sailsResponse) {
      console.log('error');
    }).finally(function eitherWay() {
      console.log('either way...');
    });

  }

  $scope.addTag = function(tag) {
    if (!$scope.isAllSelected) {
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
    } else {
      console.log('running select all tag assignment...');
      _.forEach($scope.report_types, function(report_type) {
        var hasTag = _.some(report_type.tags, {'id': tag.id});
        if (report_type.selected && !hasTag) {
          report_type.tags.push(tag);
        }
      });
      var params = {
        instituteId: $routeParams.instituteId,
        listId: $routeParams.listId,
        tagId: tag.id,
        reportTypeQuery: $scope.reportTypeQuery
      }
      Services.allSelectedAddTag(params).then(function onSuccess(response) {

      }).catch(function onError(sailsResponse) {
        console.log('error');
      }).finally(function eitherWay() {

      });
    }
  }

  $scope.bulkRemoveTag = function(tag) {
    if (!$scope.isAllSelected) {
      _.forEach($scope.report_types, function(report_type) {
        var hasTag = _.some(report_type.tags, {'id': tag.id});
        if (report_type.selected && hasTag) {
          _.remove(report_type.tags, {id: tag.id});
          var params = {
            instituteId: $routeParams.instituteId,
            listId: $routeParams.listId,
            tagId: tag.id,
            reportTypeId: report_type.id
          }
          Services.removeTag(params).then(function onSuccess(response) {

          }).catch(function onError(sailsResponse) {
            console.log('error');
          }).finally(function eitherWay() {

          });
        }
      });
    } else {
      console.log('running select all tag removal assignment...');
      _.forEach($scope.report_types, function(report_type) {
        var hasTag = _.some(report_type.tags, {'id': tag.id});
        if (report_type.selected && hasTag) {
          _.remove(report_type.tags, {id: tag.id});
        }
      });
      var params = {
        instituteId: $routeParams.instituteId,
        listId: $routeParams.listId,
        tagId: tag.id,
        reportTypeQuery: $scope.reportTypeQuery
      }
      Services.allSelectedRemoveTag(params).then(function onSuccess(response) {

      }).catch(function onError(sailsResponse) {
        console.log('error');
      }).finally(function eitherWay() {

      });
    }
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

  $scope.instituteId = $routeParams.instituteId;

  getInstituteName();

  function getInstituteName() {
    Services.getInstituteName($routeParams.instituteId).then(function onSuccess(response) {
      $scope.instituteName = response.data
    }).catch(function onError(sailsResponse) {
      console.log('problem getting institute name.');
    }).finally(function eitherWay() {
    });
  }

  //select all

  // $scope.isAllSelected = false;

  $scope.toggleAllReportTypes = function() {
    var toggleStatus = $scope.isAllSelected;
    angular.forEach($scope.report_types, function(itm){ itm.selected = toggleStatus; });
  }

  $scope.reportTypeToggled = function(){
    $scope.isAllSelected = $scope.report_types.every(function(itm){ return itm.selected; })
  }


}]);
