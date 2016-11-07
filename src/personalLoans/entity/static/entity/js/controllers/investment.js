'use strict';

app.controller('InvestmentCtrl', InvestmentCtrl);

InvestmentCtrl.$inject = ['investmentService', 'investorService', '$routeParams', '$scope', '$mdDialog', '$mdToast', '$filter'];

function InvestmentCtrl(investmentService, investorService, $routeParams, $scope, $mdDialog, $mdToast, $filter) {
    var vm = this;

    $scope.master.toolbar = {title: 'Prestamos otorgados', icon: 'static/img/business/money.svg'}
    vm.view = {
      current_date: new Date(),
    };
    vm.query = {
      investor: '',
      fee: '',
      search: '',
      ordering: '-date',
      limit: 10,
      page: 1
    };
    vm.filter = {
      show: false,
      options: {
        debounce: 500
      },
      rows: [5, 10, 20, 50, 100],
      form: undefined,
    };
    vm.data = {
      investor: undefined,
      warrant: undefined,
      authorization: undefined,
      first_name: undefined,
      last_name: undefined,
      capital: 0,
      final_capital: 0,
      profit: 0,
      fee: 6,
      interests: 12.00,
      monthly_amount: 0,
      date: undefined,
      date_partial: undefined,
    }
    vm.errors = {
      warrant: [],
      authorization: [],
    }
    vm.selected = [];
    vm.investments = [];
    vm.options = {};
    vm.investors = [];
    vm.promise;
    vm.total = {};
    vm.create_loading = false;
    vm.getInvestments = getInvestments;
    vm.showFilterBar = showFilterBar;
    vm.hideFilterBar = hideFilterBar;
    vm.clearFilterBar = clearFilterBar;
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    vm.clearDialogCreate = clearDialogCreate;
    vm.createInvestment = createInvestment;
    vm.updateFinalCapital = updateFinalCapital;
    vm.showDialogRemove = showDialogRemove;

    // INIT
    getOptions();
    getInvestors();
    getTotal();
    $scope.master.updateSideNav();

    // PUBLIC FUNCTIONS
    function getInvestments() {
      var id = $routeParams.associationId;
      vm.promise = investmentService.getList(id, vm.query)
      .then(function(response) {
        vm.investments = response.data;
      });
    }

    function showFilterBar() {
      vm.filter.show = true;
    }

    function hideFilterBar() {
      vm.filter.show = false;
    }

    function clearFilterBar() {
      vm.query.search = '';
      vm.query.investor = '';
      vm.query.fee = '';
      if(vm.filter.form.$dirty) {
        vm.filter.form.$setPristine();
      }
    }

    function showDialogCreate($event) {
      $mdDialog.show({
        targetEvent: $event,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        fullscreen: true,
        templateUrl: 'entity/loan/_add.html',
      });
    }

    function hideDialogCreate() {
      $mdDialog.hide();
    }

    function createInvestment() {
      if ($scope.investmentForm.$valid) {
        vm.create_loading = true;
        var id = $routeParams.associationId;
        vm.data.date = formatDate(vm.data.date_partial);
        investmentService.create(id, vm.data)
        .then(function(response) {
          vm.create_loading = false;
          vm.getInvestments();
          vm.hideDialogCreate();
          getTotal();
          showToastCreate();
        }).catch(function(response) {
          vm.create_loading = false;
          if (response.data.warrant) {
            vm.errors.warrant.push(vm.data.warrant);
            $scope.investmentForm.warrant.$setValidity('warrantexist', false)
          }
          if (response.data.authorization) {
            vm.errors.authorization.push(vm.data.authorization);
            $scope.investmentForm.authorization.$setValidity('authexist', false)
          }
        });
      }
    }

    function clearDialogCreate() {
      $scope.investmentForm.$setPristine();
      vm.data = {
        investor: undefined,
        warrant: undefined,
        authorization: undefined,
        first_name: undefined,
        last_name: undefined,
        capital: 0,
        final_capital: 0,
        profit: 0,
        fee: 1,
        interests: 12.00,
        monthly_amount: 0,
        date: undefined,
        date_partial: undefined,
      }
    }

    function updateFinalCapital() {
      var f_capital = vm.data.capital * (vm.data.interests / 100) * vm.data.fee + vm.data.capital;
      vm.data.monthly_amount = Math.ceil(f_capital / vm.data.fee);
      vm.data.final_capital = vm.data.monthly_amount * vm.data.fee;
      vm.data.profit = vm.data.final_capital - vm.data.capital;
    }

    function showDialogRemove($event) {
      var dialogR = $mdDialog.confirm()
          .title('Borrar Prestamo')
          .textContent('Estás seguro de querer borrar este prestamo?')
          .ariaLabel('Lucky day')
          .targetEvent($event)
          .ok('Borrar')
          .cancel('Cancelar')
          .clickOutsideToClose(true);
      $mdDialog.show(dialogR).then(function() {
        removeInvestment();
      });
    }

    // PRIVATE FUNCTIONS
    function getInvestors() {
      var id = $routeParams.associationId;
      investorService.getList(id)
      .then(function(response) {
          vm.investors = response.data;
      });
    }

    function getTotal() {
      var id = $routeParams.associationId;
      investmentService.getTotal(id, vm.query)
      .then(function(response) {
        vm.total = response.data[0];
      });
    }

    $scope.$watchGroup(['vm.query.search', 'vm.query.investor', 'vm.query.fee'], function (newValue, oldValue) {
      var bookmark = 1;
      if(!oldValue) {
        bookmark = vm.query.page;
      }
      if(newValue !== oldValue) {
        vm.query.page = 1;
      }
      if(!newValue) {
        vm.query.page = bookmark;
      }
      vm.getInvestments();
    });

    function getOptions() {
      var id = $routeParams.associationId;
      investmentService.getOptions(id)
      .then(function(response) {
        vm.options = response.data.actions.POST;
      });
    }

    function formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }

    function showToastCreate($event) {
      $mdToast.showSimple('Nuevo prestamo añadido exitosamente!');
    }

    function removeInvestment() {
      var assoc_id = $routeParams.associationId;
      var inv_id = vm.selected[0].id;
      investmentService.remove(assoc_id, inv_id)
      .then(function(response) {
        getInvestments();
        vm.selected = [];
      });
    }
}
