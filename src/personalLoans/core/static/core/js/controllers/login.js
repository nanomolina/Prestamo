'use strict';

app.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['authService', '$mdToast', '$location', '$http', '$cookies', '$rootScope'];

function LoginCtrl(authService, $mdToast, $location, $http, $cookies, $rootScope) {
    var vm = this;

    vm.data = {
      username: '',
      password: '',
    }
    vm.login = login;


    // PUBLIC FUNCTIONS
    function login() {
      authService.login(vm.data)
      .then(function(response) {
        $http.defaults.headers.common.Authorization = 'Token ' + response.key;
        $cookies.token = response.key;
        $rootScope.$broadcast("authService.logged_in", response);
        $location.path('/association');
      }).catch(function(response) {
        $mdToast.showSimple('Error al iniciar sesion!');
      });
    }
}
