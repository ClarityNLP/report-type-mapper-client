'use strict';

/* @nginject */
// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'toastr',
  'ngAnimate',
  'LocalStorageModule',
  'myApp.config',
  'myApp.map',
  'myApp.tag',
  'myApp.token',
  'myApp.users',
  'myApp.login',
  'myApp.logout',
  'myApp.register',
  'myApp.list',
  'myApp.pending',
  'myApp.institutes',
  'myApp.Access',
  'myApp.Auth',
  'myApp.services',
  'myApp.UserProfile',
  'myApp.nav',
  'angular-inview'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'app/views/app.html',
      resolve: {
        userProfile: "UserProfile"
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/login/login.html',
          controller: 'LoginCtrl'
        }
      },
      params: {
        message: null
      }
    })
    .state('app.register', {
      url: '/register',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/register/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })
    .state('app.logout', {
      url: '/logout',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html'
        },
        'main@app': {
          templateUrl: 'app/views/logout/logout.html',
          controller: 'LogoutCtrl'
        }
      }
    })
    // *** USERS ***
    .state('app.users', {
      abstract: true
    })
    .state('app.users.all', {
      url: '/users',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/users/all/all.html',
          controller: 'UsersAllCtrl'
        }
      },
      resolve: {
        access: ["Access", function(Access) { return Access.hasRole('ROLE_ADMIN'); }]
      }
    })
    .state('app.users.delete', {
      url: '/users/:userId/delete',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/users/delete/delete.html',
          controller: 'UsersDeleteCtrl'
        }
      },
      resolve: {
        access: ["Access", function(Access) { return Access.hasRole('ROLE_ADMIN'); }]
      }
    })
    // *** INSTITUTE ***
    .state('app.institutes', {
      abstract: true
    })
    .state('app.institutes.all', {
      url: '/institutes',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/institutes/all/all.html',
          controller: 'InstitutesAllCtrl'
        }
      },
      resolve: {
        access: ["Access", function(Access) { return Access.hasRole('ROLE_ADMIN'); }]
        // userProfile: "UserProfile"
      }
    })
    .state('app.institutes.create', {
      url: '/institutes/create',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/institutes/create/create.html',
          controller: 'InstitutesCreateCtrl'
        }
      }
    })
    .state('app.institutes.delete', {
      url: '/institutes/:instituteId/delete',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/institutes/delete/delete.html',
          controller: 'InstitutesDeleteCtrl'
        }
      }
    })
    .state('app.institutes.edit', {
      url: '/institutes/:instituteId/edit',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/institutes/edit/edit.html',
          controller: 'InstitutesEditCtrl'
        }
      }
    })


    .state('app.map', {
      url: '/institutes/:instituteId/lists/:listId/map',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/map/map.html',
          controller: 'MapCtrl'
        }
      },
      resolve: {
        access: ["Access", function(Access) { return Access.isAuthenticated(); }]
        // userProfile: "UserProfile"
      }
    })
    .state('app.tags', {
      url: '/tags',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/tag/tag.html',
          controller: 'TagCtrl'
        }
      },
      resolve: {
        access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      }
    })
    .state('app.token', {
      url: '/token',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/token/token.html',
          controller: 'TokenCtrl'
        }
      },
      resolve: {
        access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      }
    })
    // *** LIST ***
    .state('app.list', {
      abstract: true
    })
    .state('app.list.all', {
      url: '/institutes/:instituteId/lists',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/list/all/all.html',
          controller: 'ListAllCtrl'
        }
      },
      resolve: {
        access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      }
    })
    .state('app.list.create', {
      url: '/institutes/:instituteId/lists/create',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/list/create/create.html',
          controller: 'ListCreateCtrl'
        }
      },
      resolve: {
        access: ["Access", function(Access) { return Access.isAuthenticated(); }],
      }
    })
    .state('app.list.delete', {
      url: '/institute/:instituteId/list/:listId/delete',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/list/delete/delete.html',
          controller: 'ListDeleteCtrl'
        }
      }
    })
    .state('app.list.edit', {
      url: '/institute/:instituteId/list/:listId/edit',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/list/edit/edit.html',
          controller: 'ListEditCtrl'
        }
      }
    })
    // *** PENDING ***
    .state('app.pending', {
      url: '/pending',
      views: {
        'nav@app': {
          templateUrl: 'app/views/nav/main-nav.html',
          controller: 'NavCtrl'
        },
        'main@app': {
          templateUrl: 'app/views/pending/pending.html',
          controller: 'PendingCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/login');
}])
.config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');
  $httpProvider.defaults.withCredentials = true;
}])
// run(["Access", "$state", "$log", "$transitions", function (, Access, $state, $log, $transitions) {
//
//   $transitions.onError({}, (transition) => {
//
//     switch (transition.error().detail) {
//       case Access.UNAUTHORIZED:
//         $state.go("app.login", { message: 'User unauthorized, login first.' });
//         break;
//
//       case Access.FORBIDDEN:
//
//         $state.go("/forbidden");
//         break;
//
//       case Access.PENDING_ADMIN_APPROVAL:
//         $state.go("/pending");
//         break;
//
//       default:
//         $log.warn("$stateChangeError event catched");
//         break;
//     }
//   });
//
// }])


.run(["$rootScope", "Access", "$state", "$log", function ($rootScope, Access, $state, $log) {

  $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

    console.log('state error triggered!!!');
    switch (error) {

      case Access.UNAUTHORIZED:
        console.log('unauth!!!');
        $state.go("app.login", { message: 'You are unauthorized to do that.' });
        break;

      case Access.FORBIDDEN:
        console.log('forbidden!!!');
        $state.go("app.login", { message: 'You lack privileges to do that.' });
        break;

      case Access.PENDING_ADMIN_APPROVAL:
        $state.go("app.pending");
        break;

      default:
        $log.warn("$stateChangeError event catched");
        break;

    }
  });

}])
