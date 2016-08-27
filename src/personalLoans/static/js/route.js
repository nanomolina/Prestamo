'use strict';

app.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'core/main.html',
        controller: 'MainCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/login', {
        templateUrl: 'core/login.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/logout', {
        templateUrl: 'core/logout.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      // .when('/input', {
      //   templateUrl: 'core/input.html',
      //   resolve: {
      //     authenticated: ['djangoAuth', function(djangoAuth){
      //       return djangoAuth.authenticationStatus();
      //     }],
      //   }
      // })
      // .when('/register', {
      //   templateUrl: 'core/register.html',
      //   resolve: {
      //     authenticated: ['djangoAuth', function(djangoAuth){
      //       return djangoAuth.authenticationStatus();
      //     }],
      //   }
      // })
      // .when('/passwordReset', {
      //   templateUrl: 'core/passwordreset.html',
      //   resolve: {
      //     authenticated: ['djangoAuth', function(djangoAuth){
      //       return djangoAuth.authenticationStatus();
      //     }],
      //   }
      // })
      // .when('/passwordResetConfirm/:firstToken/:passwordResetToken', {
      //   templateUrl: 'core/passwordresetconfirm.html',
      //   resolve: {
      //     authenticated: ['djangoAuth', function(djangoAuth){
      //       return djangoAuth.authenticationStatus();
      //     }],
      //   }
      // })
      // .when('/verifyEmail/:emailVerificationToken', {
      //   templateUrl: 'core/verifyemail.html',
      //   resolve: {
      //     authenticated: ['djangoAuth', function(djangoAuth){
      //       return djangoAuth.authenticationStatus();
      //     }],
      //   }
      // })
      .when('/userProfile', {
        templateUrl: 'core/userprofile.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      // .when('/passwordChange', {
      //   templateUrl: 'core/passwordchange.html',
      //   resolve: {
      //     authenticated: ['djangoAuth', function(djangoAuth){
      //       return djangoAuth.authenticationStatus();
      //     }],
      //   }
      // })
      .when('/restricted', {
        templateUrl: 'core/restricted.html',
        controller: 'RestrictedCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .when('/authRequired', {
        templateUrl: 'core/authrequired.html',
        controller: 'AuthrequiredCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      // ENTITY
      .when('/investors', {
        templateUrl: 'entity/investors.html',
        controller: 'InvestorCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/association', {
        templateUrl: 'entity/association.html',
        controller: 'AssociationCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/association/:associationId', {
        templateUrl: 'entity/association_item.html',
        controller: 'AssociationItemCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .otherwise({
        redirectTo: '/'
      });
});
