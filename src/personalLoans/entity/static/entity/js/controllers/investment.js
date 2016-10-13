'use strict';

app.controller('InvestmentCtrl', InvestmentCtrl);

InvestmentCtrl.$inject = ['investmentService', 'investorService', '$routeParams', '$scope', '$mdDialog', '$mdToast', '$filter'];

function InvestmentCtrl(investmentService, investorService, $routeParams, $scope, $mdDialog, $mdToast, $filter) {
    var vm = this;

    vm.view = {
      title: 'Prestamos',
      icon: 'view_list'
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
      fee: 1,
      interests: 12.00,
      monthly_amount = 0,
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
    vm.getInvestments = getInvestments;
    vm.showFilterBar = showFilterBar;
    vm.hideFilterBar = hideFilterBar;
    vm.clearFilterBar = clearFilterBar;
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    vm.clearDialogCreate = clearDialogCreate;
    vm.createInvestment = createInvestment;
    vm.updateFinalCapital = updateFinalCapital;
    vm.updateMonthlyAmount = updateMonthlyAmount;


    // INIT
    getOptions();
    getInvestors();

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
        templateUrl: 'entity/loan/_add.html',
      });
    }

    function hideDialogCreate() {
      $mdDialog.hide();
    }

    function createInvestment() {
      if ($scope.investmentForm.$valid) {
        var id = $routeParams.associationId;
        vm.data.date = formatDate(vm.data.date_partial);
        investmentService.create(id, vm.data)
        .then(function(response) {
          vm.getInvestments();
          vm.hideDialogCreate();
          showToastCreate();
        }).catch(function(response) {
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
      vm.data = {
        investor: undefined,
        warrant: undefined,
        authorization: undefined,
        first_name: undefined,
        last_name: undefined,
        capital: 0,
        final_capital: 0,
        fee: 1,
        interests: 12.00,
        monthly_amount = 0,
        date: undefined,
        date_partial: undefined,
      }
    }

    function updateFinalCapital() {
      var result = ((vm.data.interests * vm.data.capital) / 100) + vm.data.capital;
      vm.data.final_capital = $filter('number')(result, 2);
      updateMonthlyAmount();
    }

    function updateMonthlyAmount() {
      var m_amount = (vm.data.final_capital / vm.data.fee);
      vm.data.monthly_amount = $filter('number')(m_amount, 2);
    }

    // PRIVATE FUNCTIONS
    function getInvestors() {
      var id = $routeParams.associationId;
      investorService.getList(id)
      .then(function(response) {
          vm.investors = response.data;
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
    };

}
