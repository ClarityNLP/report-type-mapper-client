'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.list', [
  'ngRoute',
  'toastr',
  'myApp.list.all',
  'myApp.list.create',
  'myApp.list.delete',
  'myApp.list.edit'
])
