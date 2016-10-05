'use strict';

app.controller('InvestmentCtrl', InvestmentCtrl);

InvestmentCtrl.$inject = ['investmentService', '$routeParams'];

function InvestmentCtrl(investmentService, $routeParams) {
    var vm = this;

    vm.view = {
      title: 'Prestamos',
      icon: 'view_list'
    };
    vm.selected = [];
    vm.query = {
       ordering: '-date',
       limit: 5,
       page: 1
    };
    vm.investments = [];
    vm.getInvestments = getInvestments;
    vm.promise;

    getInvestments();

    // PRIVATE FUNCTIONS
    function getInvestments() {
      var id = $routeParams.associationId;
      vm.promise = investmentService.getList(id, vm.query)
      .then(function(response) {
        vm.investments = response.data;
      });
    }
}
