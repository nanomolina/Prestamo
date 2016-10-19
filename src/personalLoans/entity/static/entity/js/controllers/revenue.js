'use strict';

app.controller('RevenueCtrl', RevenueCtrl);

RevenueCtrl.$inject = ['revenueService', 'investorService', '$routeParams', '$scope', '$locale', '$mdDialog', '$mdToast'];

function RevenueCtrl(revenueService, investorService, $routeParams, $scope, $locale, $mdDialog, $mdToast) {
    var vm = this;

    vm.view = {
      title: 'Ganancias',
      icon: 'view_list'
    };
    vm.query = {
      investor: '',
      ordering: '-period',
      limit: 10,
      page: 1
    };
    vm.filter = {
      show: false,
      options: {
        debounce: 500,
        years: [],
        months: [],
      },
      form: undefined,
    };
    vm.export = {
      type: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    }
    vm.selected = [];
    vm.revenues = [];
    vm.investors = [];
    vm.promise;
    vm.getRevenue = getRevenue;
    vm.showFilterBar = showFilterBar;
    vm.hideFilterBar = hideFilterBar;
    vm.clearFilterBar = clearFilterBar;
    vm.dialogExportExcel = dialogExportExcel;
    vm.dialogExportDoc = dialogExportDoc;
    vm.hideDialogExport = hideDialogExport;
    vm.exportResume = exportResume;

    // INIT
    getInvestors();

    // PUBLIC FUNCTIONS
    function getRevenue() {
      var id = $routeParams.associationId;
      vm.promise = revenueService.getList(id, vm.query)
      .then(function(response) {
        vm.revenues = response.data;
      });
    }

    function showFilterBar() {
      vm.filter.show = true;
    }

    function hideFilterBar() {
      vm.filter.show = false;
    }

    function clearFilterBar() {
      vm.query.investor = '';
      if(vm.filter.form.$dirty) {
        vm.filter.form.$setPristine();
      }
    }

    function dialogExportExcel($event) {
      vm.export.type = 'excel';
      showDialogExport($event);
    }

    function dialogExportDoc($event) {
      vm.export.type = 'doc';
      showDialogExport($event);
    }

    function exportResume() {
      var id = $routeParams.associationId;
      var query = '?year=' + vm.export.year + '&month=' + vm.export.month + '&type=' + vm.export.type;
      location.href = "/entity/associations/"+id+"/investments/export/" + query;
      hideDialogExport();
      $mdToast.showSimple('Exportando a .' + vm.export.type);
    }

    function hideDialogExport() {
      $mdDialog.hide();
    }

    // PRIVATE FUNCTIONS
    function getInvestors() {
      var id = $routeParams.associationId;
      investorService.getList(id)
      .then(function(response) {
          vm.investors = response.data;
      });
    }

    $scope.$watch('vm.query.investor', function (newValue, oldValue) {
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
      vm.getRevenue();
    });

    function showDialogExport($event) {
      $mdDialog.show({
        targetEvent: $event,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        templateUrl: 'entity/loan/export/_modal_export.html',
      });
    };

}
