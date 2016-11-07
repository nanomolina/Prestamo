'use strict';

app.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['authService', '$mdToast', '$location', '$http', '$cookies', '$rootScope', '$scope'];

function LoginCtrl(authService, $mdToast, $location, $http, $cookies, $rootScope, $scope) {
    var vm = this;

    vm.data = {
      username: '',
      password: '',
    }
    vm.login = login;
    vm.facebook_loading = false;


    // PUBLIC FUNCTIONS
    function login() {
      authService.login(vm.data)
      .then(function(response) {
        $http.defaults.headers.common.Authorization = 'Token ' + response.key;
        $cookies.token = response.key;
        $rootScope.$broadcast("authService.logged_in", response);
        authService.getUser()
        .then(function(response) {
          $scope.master.authenticated = true;
          $scope.master.profile = response.data[0];
          $location.path('/association');
        });
      }).catch(function(response) {
        $mdToast.showSimple('Error al iniciar sesion!');
      });
    }
}
