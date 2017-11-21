'use strict';

angular.module('myApp.Access', [])

.factory("Access", ["$q", "UserProfile", function ($q, UserProfile) {

  var Access = {

    OK: 200,

    // "we don't know who you are, so we can't say if you're authorized to access
    // this resource or not yet, please sign in first"
    UNAUTHORIZED: 401,

    // "we know who you are, and your profile does not allow you to access this resource"
    FORBIDDEN: 403,

    hasRole: function (role) {
      return UserProfile.then(function (userProfile) {
        if (userProfile.$hasRole(role)) {
          return Access.OK;
        } else if (userProfile.$isAnonymous()) {
          return $q.reject(Access.UNAUTHORIZED);
        } else {
          return $q.reject(Access.FORBIDDEN);
        }
      });
    },

    hasAnyRole: function (roles) {
      return UserProfile.then(function (userProfile) {
        if (userProfile.$hasAnyRole(roles)) {
          return Access.OK;
        } else if (userProfile.$isAnonymous()) {
          return $q.reject(Access.UNAUTHORIZED);
        } else {
          return $q.reject(Access.FORBIDDEN);
        }
      });
    },

    isAnonymous: function () {
      return UserProfile.then(function (userProfile) {
        if (userProfile.$isAnonymous()) {
          return Access.OK;
        } else {
          return $q.reject(Access.FORBIDDEN);
        }
      });
    },

    isAuthenticated: function () {
      return UserProfile.then(function (userProfile) {
        if (userProfile.$isAuthenticated()) {
          console.log('authed.');
          return Access.OK;
        } else {
          console.log('not authed.');
          return $q.reject(Access.UNAUTHORIZED);
        }
      });
    }

  };

  return Access;

}])
