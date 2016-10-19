'use strict';

app.controller('MainCtrl', function ($scope, $http, $cookies, $location, $mdSidenav) {

});


app.controller('PrincipalCtrl', PrincipalCtrl);

PrincipalCtrl.$inject = ['$scope', '$mdSidenav', '$http', '$location'];

function PrincipalCtrl($scope, $mdSidenav, $http, $location) {
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
    vm.profile = $scope.master.profile;


    // PUBLIC FUNCTIONS
    function openLeftMenu() {
      $mdSidenav('left').toggle();
    }

}
