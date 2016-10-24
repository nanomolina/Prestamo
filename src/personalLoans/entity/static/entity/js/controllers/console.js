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
          href : '#/association/' + id + '/detail',
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
    ];
    vm.goToDetail = goToDetail;
    vm.goToLoans = goToLoans;
    vm.goToMonthlyResume = goToMonthlyResume;
    vm.goToRevenue = goToRevenue;

    // INIT
    $scope.master.updateSideNav();

    // PUBLIC FUNCTIONS
    function goToDetail() {
      var id = $routeParams.associationId;
      $location.path('/association/' + id + '/detail');
    }

    function goToLoans() {
      var id = $routeParams.associationId;
      $location.path('/association/' + id + '/loans');
    }

    function goToMonthlyResume() {
      var id = $routeParams.associationId;
      $location.path('/association/' + id + '/monthly_resume');
    }

    function goToRevenue() {
      var id = $routeParams.associationId;
      $location.path('/association/' + id + '/revenue');
    }

    // PRIVATE FUNCTIONS
}
