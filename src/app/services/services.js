angular.module('myApp.services', [])

.service("Services", ["$http", "EnvironmentConfig", function ($http, EnvironmentConfig) {

  this.getReportTypes = function(params) {
    return $http.get(EnvironmentConfig.API_URL+'/institutes/'+params.instituteId+'/lists/'+params.listId+'/reportTypes?page='+params.reportTypePage+'&query='+params.reportTypeQuery)
  }

  this.getToken = function() {
    return $http.get(EnvironmentConfig.API_URL+'/getToken');
  }

  this.getTags = function(params) {
    return $http.get(EnvironmentConfig.API_URL+'/institutes/'+params.instituteId+'/lists/'+params.listId+'/tags?query='+params.tagQuery)
  }

  this.addTag = function(params) {
    var payload = {
      reportTypeId: params.reportTypeId,
      tagId: params.tagId
    };
    return $http.post(EnvironmentConfig.API_URL+'/institutes/'+params.instituteId+'/lists/'+params.listId+'/addTag', payload)
  }

  this.allSelectedAddTag = function(params) {
    var payload = {
      reportTypeQuery: params.reportTypeQuery,
      tagId: params.tagId
    };
    return $http.post(EnvironmentConfig.API_URL+'/institutes/'+params.instituteId+'/lists/'+params.listId+'/allSelectedAddTag', payload)
  }

  this.removeTag = function(params) {
    var payload = {
      reportTypeId: params.reportTypeId,
      tagId: params.tagId
    };
    return $http.post(EnvironmentConfig.API_URL+'/institutes/'+params.instituteId+'/lists/'+params.listId+'/removeTag', payload)
  }

  this.allSelectedRemoveTag = function(params) {
    var payload = {
      reportTypeQuery: params.reportTypeQuery,
      tagId: params.tagId
    };
    return $http.post(EnvironmentConfig.API_URL+'/institutes/'+params.instituteId+'/lists/'+params.listId+'/allSelectedRemoveTag', payload)
  }

  this.createTag = function(name) {
    return $http.post(EnvironmentConfig.API_URL+'/tags', { name: name });
  }

  this.getTagCount = function() {
    return $http.get(EnvironmentConfig.API_URL+'/tags/count')
  }

  this.getInstitutes = function() {
    return $http.get(EnvironmentConfig.API_URL+'/institutes')
  }

  this.createInstitute = function(name) {
    return $http.post(EnvironmentConfig.API_URL+'/institutes', { name: name });
  }

  this.getInstitute = function(instituteId) {
    return $http.get(EnvironmentConfig.API_URL+'/institutes/'+instituteId);
  }

  this.editInstitute = function(params) {
    return $http.post(EnvironmentConfig.API_URL+'/institutes/'+params.instituteId, { name: params.name });
  }

  this.deleteInstitute = function(instituteId) {
    return $http.delete(EnvironmentConfig.API_URL+'/institutes/'+instituteId);
  }

  this.getInstituteName = function(instituteId) {
    return $http.get(EnvironmentConfig.API_URL+'/institutes/'+instituteId+'/name');
  }

  this.getUsers = function() {
    return $http.get(EnvironmentConfig.API_URL+'/users');
  }

  this.activateUser = function(user) {
    return $http.post(EnvironmentConfig.API_URL+'/users/'+user.id+'/activate', { activate: user.activated });
  }

  this.deleteUser = function(userId) {
    return $http.delete(EnvironmentConfig.API_URL+'/users/'+userId);
  }

}])
