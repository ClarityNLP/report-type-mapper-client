'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.institutes', [
  'ngRoute',
  'toastr',
  'myApp.institutes.all',
  'myApp.institutes.create',
  'myApp.institutes.delete',
  'myApp.institutes.edit'
])
