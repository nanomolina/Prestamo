'use strict';

app.controller('InvestmentCtrl', InvestmentCtrl);

InvestmentCtrl.$inject = ['investmentService', '$routeParams'];

function InvestmentCtrl(investmentService, $routeParams) {
    var vm = this;

    vm.view = {
      title: 'Console',
      icon: 'view_list'
    };
    vm.selected = [];
    vm.query = {
       order: 'warrant',
       limit: 5,
       page: 1
    };
    vm.investments = [];
    vm.getInvestments = getInvestments;

    getInvestments();

    // PRIVATE FUNCTIONS
    function getInvestments() {
      var id = $routeParams.associationId;
      investmentService.getList(id, vm.query)
      .then(function(response) {
        vm.investments = response.data;
      });
    }
}
