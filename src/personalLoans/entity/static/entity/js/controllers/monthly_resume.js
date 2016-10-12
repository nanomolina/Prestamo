'use strict';

app.controller('MonthlyResume', MonthlyResume);

MonthlyResume.$inject = ['investmentService', 'investorService', '$routeParams', '$scope', '$mdDialog', '$mdToast'];

function MonthlyResume(investmentService, investorService, $routeParams, $scope, $mdDialog, $mdToast) {
    var vm = this;

    vm.view = {
      title: 'Amembe',
      icon: 'view_list'
    };
    vm.query = {
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
    vm.selected = [];
    vm.investments = [];
    vm.promise;
    vm.getInvestments = getInvestments;
    vm.showFilterBar = showFilterBar;
    vm.hideFilterBar = hideFilterBar;
    vm.clearFilterBar = clearFilterBar;

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
      if(vm.filter.form.$dirty) {
        vm.filter.form.$setPristine();
      }
    }

    // PRIVATE FUNCTIONS
    $scope.$watchGroup(['vm.query.search'], function (newValue, oldValue) {
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

    function formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }

}
