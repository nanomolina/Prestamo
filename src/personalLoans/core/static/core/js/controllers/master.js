'use strict';

app.controller('MasterCtrl', MasterCtrl);

MasterCtrl.$inject = ['authService', '$scope', '$location', '$mdSidenav'];

function MasterCtrl(authService, $scope, $location, $mdSidenav) {
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
    vm.authenticated = false;
    vm.profile = {};
    vm.isSidenavOpen = false;
    vm.toggleLeftMenu = toggleLeftMenu;


    // PUBLIC FUNCTIONS
    function toggleLeftMenu() {
      $mdSidenav('left').toggle();
    }


    // PRIVATE FUNCTIONS
    authService.getUser()
    .then(function(response) {
      vm.authenticated = true;
      vm.profile = response.data;
    });

    // Wait and respond to the logout event.
    $scope.$on('authService.logged_out', function() {
      vm.authenticated = false;
    });
    // Wait and respond to the log in event.
    $scope.$on('authService.logged_in', function() {
      vm.authenticated = true;
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      $location.path('/login');
    });

}
