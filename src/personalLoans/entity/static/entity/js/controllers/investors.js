'use strict';

app.controller('InvestorCtrl', InvestorCtrl);

InvestorCtrl.$inject = ['investorService', '$mdDialog', '$scope', '$mdToast'];

function InvestorCtrl(investorService, $mdDialog, $scope, $mdToast) {
    var vm = this;

    vm.first_name;
    vm.last_name;
    vm.gender = '1';
    vm.image_url;
    vm.investors = [];
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    vm.clearDialogCreate = clearDialogCreate;
    vm.createInvestor = createInvestor;


    // INIT FUNCTIONS
    getInvestors();


    // PUBLIC FUNCTIONS
    function showDialogCreate($event) {
      $mdDialog.show({
        targetEvent: $event,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        templateUrl: 'entity/_add_investor.html',
      });
    }

    function hideDialogCreate() {
      $mdDialog.hide();
    }

    function clearDialogCreate() {
      vm.first_name = '';
      vm.last_name = '';
    }

    function createInvestor() {
      if ($scope.investorForm.$valid) {
        var id = $scope.params.associationId;
        var data = {
          first_name: vm.first_name,
          last_name: vm.last_name,
          gender: vm.gender,
        };
        investorService.create(id, data)
        .then(function(response) {
          vm.investors.push(response.data);
          hideDialogCreate();
          showToastCreate();
        }).catch(function(response) {
          $mdToast.showSimple('Error al añadir inversor.');
        });
      }
    }

    // PRIVATE FUNCTIONS
    function getInvestors() {
      var id = $scope.params.associationId;
      investorService.getList(id)
      .then(function(response) {
          vm.investors = response.data;
      });
    }

    function showToastCreate($event) {
      $mdToast.showSimple('Inversor ' + vm.first_name + ' ' + vm.last_name + ' añadido exitosamente!');
    };

}
