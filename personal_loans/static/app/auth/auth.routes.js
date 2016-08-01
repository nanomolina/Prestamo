'use strict';

angular
  .module('angularDjangoRegistrationAuthApp')
  .config(routes)
  .run(run);

function routes($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'rendered-partials/login.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/logout', {
    templateUrl: 'rendered-partials/logout.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/input', {
    templateUrl: 'rendered-partials/input.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/register', {
    templateUrl: 'rendered-partials/register.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/passwordReset', {
    templateUrl: 'rendered-partials/passwordreset.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/passwordResetConfirm/:firstToken/:passwordResetToken', {
    templateUrl: 'rendered-partials/passwordresetconfirm.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/verifyEmail/:emailVerificationToken', {
    templateUrl: 'rendered-partials/verifyemail.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/userProfile', {
    templateUrl: 'rendered-partials/userprofile.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/passwordChange', {
    templateUrl: 'rendered-partials/passwordchange.html',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/restricted', {
    templateUrl: 'rendered-partials/restricted.html',
    controller: 'RestrictedCtrl',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
  .when('/authRequired', {
    templateUrl: 'rendered-partials/authrequired.html',
    controller: 'AuthrequiredCtrl',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus(true);
      }],
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}
function run(djangoAuth){
  djangoAuth.initialize('//127.0.0.1:8000/rest-auth', false);
}