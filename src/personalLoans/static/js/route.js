'use strict';

app.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'entity/association.html',
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
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/association', {
        templateUrl: 'entity/association.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/association/:associationId/console', {
        templateUrl: 'entity/console.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/association/:associationId/detail', {
        templateUrl: 'entity/detail/association.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/association/:associationId/loans', {
        templateUrl: 'entity/loan/investments.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus(true);
          }],
        }
      })
      .when('/association/:associationId/monthly_resume', {
        templateUrl: 'entity/loan/monthly_resume.html',
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
