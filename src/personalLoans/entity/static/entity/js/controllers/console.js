'use strict';

app.controller('ConsoleCtrl', ConsoleCtrl);

ConsoleCtrl.$inject = ['$routeParams', '$location', '$scope'];

function ConsoleCtrl($routeParams, $location, $scope) {
    var vm = this;
    var id = $routeParams.associationId;

    $scope.master.toolbar = {title: 'Console', icon: 'view_list'}
    vm.sections = [
        {
          title: 'Inversores',
          icon: 'static/img/business/diagram.svg',
          href : '#/association/' + id + '/members',
        },
        {
          title: 'Prestamos',
          icon: 'static/img/business/money.svg',
          href : '#/association/' + id + '/loans',
        },
        {
          title: 'Amembe',
          icon: 'static/img/business/receipt.svg',
          href : '#/association/' + id + '/monthly_resume',
        },
        {
          title: 'Devolucion',
          icon: 'static/img/business/get-money.svg',
          href : '#/association/' + id + '/revenue',
        },
        {
          title: 'Configuración',
          icon: 'static/img/business/justice.svg',
          href : '#/association/' + id + '/config',
        },
    ];
    vm.general_loading = false;
    vm.showLoader = showLoader;

    // INIT
    $scope.master.updateSideNav();

    // PUBLIC FUNCTIONS
    function showLoader() {
      vm.general_loading = true
    }
}
