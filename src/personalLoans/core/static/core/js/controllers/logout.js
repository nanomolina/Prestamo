'use strict';

app.controller('LogoutCtrl', LogoutCtrl);

LogoutCtrl.$inject = ['authService', '$scope', '$location'];

function LogoutCtrl(authService, $scope, $location) {
  var vm = this;

  logout();

  // PRIVATE FUNCTIONS
  function logout() {
    authService.logout();
    $location.path('/login');
  }
}
