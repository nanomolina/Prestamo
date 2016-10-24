'use strict';

app.controller('MasterCtrl', MasterCtrl);

MasterCtrl.$inject = ['authService', '$scope', '$location', '$mdSidenav', '$routeParams'];

function MasterCtrl(authService, $scope, $location, $mdSidenav, $routeParams) {
    var vm = this;

    vm.menu = [];
    vm.admin = [
      {
        link: '#/logout',
        title: 'Cerrar Sesión',
        icon: 'exit_to_app'
      },
    ];
    vm.toolbar = {title: '', icon: ''};
    vm.authenticated = false;
    vm.profile = {};
    vm.isSidenavOpen = false;
    vm.toggleLeftMenu = toggleLeftMenu;
    vm.updateSideNav = updateSideNav;

    // INIT
    getProfile();
    updateSideNav();

    // PUBLIC FUNCTIONS
    function toggleLeftMenu() {
      $mdSidenav('left').toggle();
    }

    // PRIVATE FUNCTIONS
    function getProfile() {
      authService.getUser()
      .then(function(response) {
        vm.authenticated = true;
        vm.profile = response.data;
      });
    }

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

    function updateSideNav() {
      var id = $routeParams.associationId;
      if (id === undefined) {
        vm.menu = [
            {
              link : '#/association',
              title: 'Asociaciones',
              icon: 'static/img/business/cityscape.svg'
            },
        ];
      } else {
        vm.menu = [
            {
              link : '#/association',
              title: 'Asociaciones',
              icon: 'static/img/business/cityscape.svg'
            },
            {
              link : '#/association/'+id+'/detail',
              title: 'Inversores',
              icon: 'static/img/business/diagram.svg'
            },
            {
              link : '#/association/'+id+'/loans',
              title: 'Prestamos',
              icon: 'static/img/business/money.svg'
            },
            {
              link : '#/association/'+id+'/monthly_resume',
              title: 'Amembe',
              icon: 'static/img/business/receipt.svg'
            },
            {
              link : '#/association/'+id+'/revenue',
              title: 'Ganancias',
              icon: 'static/img/business/get-money.svg'
            },
        ];
      }
    }
}
