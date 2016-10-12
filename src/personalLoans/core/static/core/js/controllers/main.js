'use strict';

app.controller('MainCtrl', function ($scope, $http, $cookies, $location, djangoAuth, $mdSidenav) {

});


app.controller('PrincipalCtrl', function ($scope, $mdSidenav, $http) {
    var vm = this;

    vm.menu = [
      {
        link : '#/',
        title: 'Consola Principal',
        icon: 'dashboard'
      },
      {
        link : '#/association',
        title: 'Asociaciones',
        icon: 'business'
      },
    ];
    vm.admin = [
      {
        link: '#/logout',
        title: 'Cerrar Sesión',
        icon: 'exit_to_app'
      },
    ];
    vm.isSidenavOpen = false;
    vm.openLeftMenu = openLeftMenu;
    vm.profile = {};

    // INIT
    getUser();

    // PUBLIC FUNCTIONS
    function openLeftMenu() {
      $mdSidenav('left').toggle();
    }

    // PRIVATE FUNCTIONS
    function getUser() {
      $http.get("rest-auth/user")
      .then(function(response) {
          vm.profile = response.data;
      });
    }

  });
