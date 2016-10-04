'use strict';


app.controller('InvestmentCtrl', InvestmentCtrl);
InvestmentCtrl.$inject = ['$scope'];

function InvestmentCtrl($scope) {
    var vm = this;

    vm.view = {
      title: 'Console',
      icon: 'view_list'
    };
    vm.selected = [];
    vm.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    vm.success = success;
    vm.getDesserts = getDesserts;

    function success(desserts) {
      $scope.desserts = desserts;
    }

    function getDesserts() {
      $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    };

    // PRIVATE FUNCTIONS
}
