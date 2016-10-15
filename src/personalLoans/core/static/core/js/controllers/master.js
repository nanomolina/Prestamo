'use strict';

app.controller('MasterCtrl', function ($scope, $location, authService) {
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    authService.authStatus()
    .then(function() {
        $scope.authenticated = true;
    });
    // Wait and respond to the logout event.
    $scope.$on('authService.logged_out', function() {
      $scope.authenticated = false;
    });
    // Wait and respond to the log in event.
    $scope.$on('authService.logged_in', function() {
      $scope.authenticated = true;
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      $location.path('/login');
    });
  });
