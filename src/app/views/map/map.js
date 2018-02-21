'use strict';

angular.module('myApp.map', ['ngLodash'])

.controller('MapCtrl', ['$scope', 'lodash', '$stateParams', 'userProfile', 'Services', function($scope, lodash, $stateParams, userProfile, Services) {

  $scope.userProfile = userProfile;

  $scope.reportTypePage = 0;

  $scope.showLoader = false;

  $scope.isUntaggedOnlySelected = false;

  getReportTypes();
  getTags();

  function getReportTypes() {

    var params = {
      instituteId: $stateParams.instituteId,
      listId: $stateParams.listId,
      reportTypePage: $scope.reportTypePage,
      reportTypeQuery: '',
      untaggedOnly: $scope.isUntaggedOnlySelected ? $scope.isUntaggedOnlySelected : ''
    }

    Services.getReportTypes(params).then(function onSuccess(response) {
      $scope.numReportTypeResults = response.data.numResults;
      console.log('response: ',response);
      $scope.report_types = response.data.reportTypes;
      if (response.data.reportTypes.length == 30) {
        $scope.showLoader = true;
      } else {
        $scope.showLoader = false;
      }
    }).catch(function onError(sailsResponse) {
      console.log('error');
    }).finally(function eitherWay() {

    });
  }

  function getTags() {

    var params = {
      instituteId: $stateParams.instituteId,
      listId: $stateParams.listId,
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

  $scope.searchReportType = function(e) {
    $scope.isAllSelected = false;
    $scope.isUntaggedOnlySelected = false;

    $scope.reportTypePage = 0;

    var params = {
      instituteId: $stateParams.instituteId,
      listId: $stateParams.listId,
      reportTypePage: $scope.reportTypePage,
      reportTypeQuery: $scope.reportTypeQuery,
      untaggedOnly: $scope.isUntaggedOnlySelected ? $scope.isUntaggedOnlySelected : ''
    }

    Services.getReportTypes(params).then(function onSuccess(response) {
      $scope.numReportTypeResults = response.data.numResults;
      $scope.report_types = response.data.reportTypes;
      if (response.data.reportTypes.length == 30) {
        $scope.showLoader = true;
      } else {
        $scope.showLoader = false;
      }
    }).catch(function onError(sailsResponse) {
      console.log('error');
    }).finally(function eitherWay() {
      console.log('either way...');
    });

  }

  $scope.searchTag = function(e) {

    var params = {
      instituteId: $stateParams.instituteId,
      listId: $stateParams.listId,
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
            instituteId: $stateParams.instituteId,
            listId: $stateParams.listId,
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
      _.forEach($scope.report_types, function(report_type) {
        var hasTag = _.some(report_type.tags, {'id': tag.id});
        if (report_type.selected && !hasTag) {
          report_type.tags.push(tag);
        }
      });
      var params = {
        instituteId: $stateParams.instituteId,
        listId: $stateParams.listId,
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
            instituteId: $stateParams.instituteId,
            listId: $stateParams.listId,
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
      _.forEach($scope.report_types, function(report_type) {
        var hasTag = _.some(report_type.tags, {'id': tag.id});
        if (report_type.selected && hasTag) {
          _.remove(report_type.tags, {id: tag.id});
        }
      });
      var params = {
        instituteId: $stateParams.instituteId,
        listId: $stateParams.listId,
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
            instituteId: $stateParams.instituteId,
            listId: $stateParams.listId,
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

  $scope.instituteId = $stateParams.instituteId;

  getInstituteName();

  function getInstituteName() {
    Services.getInstituteName($stateParams.instituteId).then(function onSuccess(response) {
      $scope.instituteName = response.data
    }).catch(function onError(sailsResponse) {
      console.log('problem getting institute name.');
    }).finally(function eitherWay() {
    });
  }

  $scope.toggleAllReportTypes = function() {
    var toggleStatus = $scope.isAllSelected;
    angular.forEach($scope.report_types, function(itm){ itm.selected = toggleStatus; });
  }

  $scope.reportTypeToggled = function(){
    $scope.isAllSelected = $scope.report_types.every(function(itm){ return itm.selected; })
  }

  $scope.toggleHideTags = function() {
    console.log('hiding tags...');
  }

  $scope.toggleUntaggedOnly = function() {
    $scope.isAllSelected = false;
    $scope.reportTypePage = 0;

    var params = {
      instituteId: $stateParams.instituteId,
      listId: $stateParams.listId,
      reportTypePage: $scope.reportTypePage,
      reportTypeQuery: $scope.reportTypeQuery ? $scope.reportTypeQuery : '',
      untaggedOnly: $scope.isUntaggedOnlySelected ? $scope.isUntaggedOnlySelected : ''
    }

    Services.getReportTypes(params).then(function onSuccess(response) {
      $scope.numReportTypeResults = response.data.numResults;
      $scope.report_types = response.data.reportTypes;
      console.log('response: ',response);
      if (response.data.reportTypes.length > 0) {
        $scope.showLoader = true;
      } else {
        $scope.showLoader = false;
      }
    }).catch(function onError(sailsResponse) {
      console.log('error');
    }).finally(function eitherWay() {
      console.log('either way...');
    });
  }

  $scope.loaderInView = function(index,inview,inviewInfo) {
    var parts = inviewInfo.parts;
    if (parts && parts.bottom && parts.left && parts.right && parts.top) {

        $scope.reportTypePage = $scope.reportTypePage + 1;

        var params = {
          instituteId: $stateParams.instituteId,
          listId: $stateParams.listId,
          reportTypePage: $scope.reportTypePage,
          reportTypeQuery: $scope.reportTypeQuery ? $scope.reportTypeQuery : '',
          untaggedOnly: $scope.isUntaggedOnlySelected ? $scope.isUntaggedOnlySelected : ''
        }

        Services.getReportTypes(params).then(function onSuccess(response) {
          _.forEach(response.data.reportTypes, function(value) {
            $scope.report_types.push(Object.assign({},value, {selected: $scope.isAllSelected}));
          });

          if (response.data.reportTypes.length == 30) {
            $scope.showLoader = true;
          } else {
            $scope.showLoader = false;
          }
        }).catch(function onError(sailsResponse) {
          console.log('error');
        }).finally(function eitherWay() {
          console.log('either way...');
        });
    }
  }


}]);
