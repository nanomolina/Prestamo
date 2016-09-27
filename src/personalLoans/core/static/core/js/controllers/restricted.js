'use strict';

/**
 * @ngdoc function
 * @name angularDjangoRegistrationAuthApp.controller:RestrictedCtrl
 * @description
 * # RestrictedCtrl
 * Controller of the angularDjangoRegistrationAuthApp
 */
app.controller('RestrictedCtrl', function ($scope, $location) {
    $scope.$on('djangoAuth.logged_in', function() {
      $location.path('/association');
    });
  });
