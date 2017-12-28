angular.module('myApp.services', [])

.service("Services", ["$http", function ($http) {

  this.getReportTypes = function(params) {
    return $http.get('http://localhost:1337/institutes/'+params.instituteId+'/lists/'+params.listId+'/reportTypes?page='+params.reportTypePage+'&query='+params.reportTypeQuery)
  }

  this.getTags = function(params) {
    return $http.get('http://localhost:1337/institutes/'+params.instituteId+'/lists/'+params.listId+'/tags?query='+params.tagQuery)
  }

  this.addTag = function(params) {
    var payload = {
      reportTypeId: params.reportTypeId,
      tagId: params.tagId
    };
    return $http.post('http://localhost:1337/institutes/'+params.instituteId+'/lists/'+params.listId+'/addTag', payload)
  }

  this.removeTag = function(params) {
    var payload = {
      reportTypeId: params.reportTypeId,
      tagId: params.tagId
    };
    return $http.post('http://localhost:1337/institutes/'+params.instituteId+'/lists/'+params.listId+'/removeTag', payload)
  }

  this.createTag = function(name) {
    return $http.post('http://localhost:1337/tags', { name: name });
  }

  this.getTagCount = function() {
    return $http.get('http://localhost:1337/tags/count')
  }

  this.getInstitutes = function() {
    return $http.get('http://localhost:1337/institutes')
  }

  this.createInstitute = function(name) {
    return $http.post('http://localhost:1337/institutes', { name: name });
  }

  this.getInstitute = function(instituteId) {
    return $http.get('http://localhost:1337/institutes/'+instituteId);
  }

  this.editInstitute = function(params) {
    return $http.post('http://localhost:1337/institutes/'+params.instituteId, { name: params.name });
  }

  this.deleteInstitute = function(instituteId) {
    return $http.delete('http://localhost:1337/institutes/'+instituteId);
  }

  this.getInstituteName = function(instituteId) {
    return $http.get('http://localhost:1337/institutes/'+instituteId+'/name');
  }

}])
