'use strict';

app.controller('InvestorCtrl', InvestorCtrl);

InvestorCtrl.$inject = ['investorService', '$mdDialog', '$scope', '$mdToast'];

function InvestorCtrl(investorService, $mdDialog, $scope, $mdToast) {
    var vm = this;

    vm.first_name;
    vm.last_name;
    vm.image_url;
    vm.investors = [];
    vm.showDialogCreate = showDialogCreate;


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

    // PRIVATE FUNCTIONS
    function getInvestors() {
      var id = $scope.params.associationId;
      investorService.getList(id)
      .then(function(response) {
          vm.investors = response.data;
      });
    }

}
