'use strict';

app.controller('InvestmentCtrl', InvestmentCtrl);

InvestmentCtrl.$inject = ['investmentService', 'investorService', '$routeParams', '$scope', '$mdDialog'];

function InvestmentCtrl(investmentService, investorService, $routeParams, $scope, $mdDialog) {
    var vm = this;

    vm.view = {
      title: 'Prestamos',
      icon: 'view_list'
    };
    vm.query = {
      search: '',
      ordering: '-date',
      limit: 5,
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
      capital: undefined,
      final_capital: undefined,
      fee: 1,
      interests: 12.00,
      date: undefined,
      date_partial: undefined,
    }
    vm.selected = [];
    vm.investments = [];
    vm.options = {};
    vm.investors = [];
    vm.promise;
    vm.getInvestments = getInvestments;
    vm.showSearchFilter = showSearchFilter;
    vm.removeFilter = removeFilter;
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    // vm.clearDialogCreate = clearDialogCreate;
    vm.createInvestment = createInvestment;

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

    function showSearchFilter() {
      vm.filter.show = true;
    }

    function removeFilter() {
      vm.filter.show = false;
      vm.query.search = '';
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
        }).catch(function(response) {
          $scope.investmentForm.$error = response;
        });
      }
    }

    // PRIVATE FUNCTIONS
    $scope.$watch('vm.query.search', function (newValue, oldValue) {
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

    function getInvestors() {
      var id = $routeParams.associationId;
      investorService.getList(id)
      .then(function(response) {
          vm.investors = response.data;
      });
    }
}
