'use strict';

app.controller('InvestmentCtrl', InvestmentCtrl);

InvestmentCtrl.$inject = ['investmentService', '$routeParams', '$scope'];

function InvestmentCtrl(investmentService, $routeParams, $scope) {
    var vm = this;

    vm.view = {
      title: 'Prestamos',
      icon: 'view_list'
    };
    vm.selected = [];
    vm.query = {
      search: '',
      ordering: '-date',
      limit: 5,
      page: 1
    };
    vm.investments = [];
    vm.promise;
    vm.filter = {
      show: false,
      options: {
        debounce: 500
      },
      form: undefined,
    };
    vm.getInvestments = getInvestments;
    vm.showSearchFilter = showSearchFilter;
    vm.removeFilter = removeFilter;

    getInvestments();

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
}
