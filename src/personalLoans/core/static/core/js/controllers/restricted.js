'use strict';

/**
 * @ngdoc function
 * @name personalLoans.controller:RestrictedCtrl
 * @description
 * # RestrictedCtrl
 * Controller of the personalLoans
 */
app.controller('RestrictedCtrl', function ($scope, $location) {
    $scope.$on('authService.logged_in', function() {
      $location.path('/association');
    });
  });
