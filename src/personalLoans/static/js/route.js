'use strict';

app.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'entity/association.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      .when('/login', {
        templateUrl: 'core/login.html',
      })
      .when('/logout', {
        templateUrl: 'core/logout.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      // ENTITY
      .when('/investors', {
        templateUrl: 'entity/investors.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      .when('/association', {
        templateUrl: 'entity/association.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      .when('/association/:associationId/console', {
        templateUrl: 'entity/console.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      .when('/association/:associationId/detail', {
        templateUrl: 'entity/detail/association.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      .when('/association/:associationId/loans', {
        templateUrl: 'entity/loan/investments.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      .when('/association/:associationId/monthly_resume', {
        templateUrl: 'entity/loan/monthly_resume.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      .when('/association/:associationId/revenue', {
        templateUrl: 'entity/loan/revenue.html',
        resolve: {
          authenticated: ['authService', function(authService){
            return authService.getUser();
          }],
        }
      })
      .otherwise({
        redirectTo: '/'
      });
});
