angular.module('myApp.UserProfile', [])

.factory("UserProfile", ["Auth", function (Auth) {

  var userProfile = {};

  var clearUserProfile = function () {
    for (var prop in userProfile) {
      if (userProfile.hasOwnProperty(prop)) {
        delete userProfile[prop];
      }
    }
  };

  var fetchUserProfile = function () {
    return Auth.getProfile().then(function (response) {
      clearUserProfile();
      return angular.extend(userProfile, response.data, {

        $refresh: fetchUserProfile,

        $hasRole: function (role) {
          if (!userProfile.roles) {
            return false;
          }
          return userProfile.roles.indexOf(role) >= 0;
        },

        $hasAnyRole: function (roles) {
          return !!userProfile.roles.filter(function (role) {
            return roles.indexOf(role) >= 0;
          }).length;
        },

        $isAnonymous: function () {
          return userProfile.anonymous;
        },

        $isAuthenticated: function () {
          return userProfile.userId;
        },

        $isPending: function () {
          if (!userProfile.roles) {
            return false;
          }
          return userProfile.roles.indexOf('ROLE_PENDING_USER') >= 0;
        }

      });
    });
  };

  return fetchUserProfile();

}])
