'use strict';

app.controller('MonthlyResume', MonthlyResume);

MonthlyResume.$inject = ['investmentService', '$routeParams', '$scope', '$locale', '$mdDialog', '$mdToast'];

function MonthlyResume(investmentService, $routeParams, $scope, $locale, $mdDialog, $mdToast) {
    var vm = this;

    $scope.master.toolbar = {title: 'Planilla mensual para Amembe', icon: 'static/img/business/receipt.svg',}
    vm.view = {
      current_date: new Date(),
    };
    vm.query = {
      search: '',
      year: '',
      month: '',
      ordering: '-date',
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
      rows: [5, 10, 20, 50, 100],
      form: undefined,
    };
    vm.export = {
      type: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    }
    vm.selected = [];
    vm.investments = [];
    vm.promise;
    vm.getInvestments = getInvestments;
    vm.showFilterBar = showFilterBar;
    vm.hideFilterBar = hideFilterBar;
    vm.clearFilterBar = clearFilterBar;
    vm.dialogExportExcel = dialogExportExcel;
    vm.dialogExportDoc = dialogExportDoc;
    vm.hideDialogExport = hideDialogExport;
    vm.exportResume = exportResume;

    // INIT
    initDateFilter();
    $scope.master.updateSideNav();

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
      vm.query.year = '';
      vm.query.month = '';
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
    $scope.$watchGroup(['vm.query.search', 'vm.query.year', 'vm.query.month'], function (newValue, oldValue) {
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

    function initDateFilter() {
      var currentYear = new Date().getFullYear();
      var monthNames = $locale.DATETIME_FORMATS.MONTH
      // Build a list of months over 20 years
      currentYear += 5
      for (var year=currentYear; year >= (currentYear-10); year--) {
        vm.filter.options.years.push(year);
      }
      for (var m=0; m < monthNames.length; m++) {
        vm.filter.options.months.push({value: m+1, text: monthNames[m]});
      }
    }

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
