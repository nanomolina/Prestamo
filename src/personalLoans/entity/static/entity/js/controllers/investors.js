'use strict';

app.controller('InvestorCtrl', InvestorCtrl);

InvestorCtrl.$inject = ['investorService', '$scope', '$mdToast', '$mdDialog', '$routeParams'];

function InvestorCtrl(investorService, $scope, $mdToast, $mdDialog, $routeParams) {
    var vm = this;

    $scope.master.toolbar = {title: 'Inversores', icon: 'static/img/business/diagram.svg'}
    vm.data = {
      first_name: '',
      last_name: '',
      alias: '',
      gender: '1',
      image_url: '',
    }
    vm.data_edit = {};
    vm.investors = [];
    vm.men_avatars = [];
    vm.women_avatars = [];
    vm.is_selected_investor = false;
    vm.selected_investor = {};
    vm.index_selected_investor = undefined;
    vm.create_loading = false;
    vm.form_readonly = true;
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    vm.clearDialogCreate = clearDialogCreate;
    vm.createInvestor = createInvestor;
    vm.is_male = is_male;
    vm.is_female = is_female;
    vm.chooseAvatar = chooseAvatar;
    vm.selectInvestor = selectInvestor;
    vm.editEnabled = editEnabled;
    vm.editDisabled = editDisabled;
    vm.editInvestor = editInvestor;


    // INIT FUNCTIONS
    getInvestors();
    getAvatars();
    $scope.master.updateSideNav();


    // PUBLIC FUNCTIONS
    function showDialogCreate($event) {
      $mdDialog.show({
        contentElement: '#investor-dialog-create',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        fullscreen: true,
      });
    }

    function hideDialogCreate() {
      $mdDialog.hide();
    }

    function clearDialogCreate() {
      $scope.investorForm.$setPristine();
      vm.data = {
        first_name: '',
        last_name: '',
        alias: '',
        gender: '1',
        image_url: '',
      }
    }

    function createInvestor() {
      if ($scope.investorForm.$valid) {
        vm.create_loading = true;
        var id = $routeParams.associationId;
        investorService.create(id, vm.data)
        .then(function(response) {
          vm.investors.push(response.data);
          hideDialogCreate();
          showToastCreate();
          vm.create_loading = false;
        }).catch(function(response) {
          $mdToast.showSimple('Error al añadir inversor.');
          vm.create_loading = false;
        });
      }
    }

    function is_male(gender) {
      return gender == '1';
    }

    function is_female(gender) {
      return gender == '2';
    }

    function chooseAvatar(index, event, action) {
      var element = angular.element(document.querySelector('.avatar-selected'));
      var target = angular.element(event.target);
      if (!target.hasClass('md-button')){
        var target = angular.element(event.target.parentElement);
      }
      element.removeClass('avatar-selected');
      target.addClass('avatar-selected');
      if (action == "add") {
        if (is_male(vm.data.gender)) {
          vm.data.image_url = vm.men_avatars[index];
        } else {
          vm.data.image_url = vm.women_avatars[index];
        }
      } else {
        if (is_male(vm.data_edit.gender)) {
          vm.data_edit.image_url = vm.men_avatars[index];
        } else {
          vm.data_edit.image_url = vm.women_avatars[index];
        }
      }
    }

    function selectInvestor(index, event) {
      vm.selected_investor = vm.investors[index];
      vm.index_selected_investor = index;
      vm.is_selected_investor = true;
      vm.form_readonly = true;
      showDialogInvestorDetail(event);
    }

    function editEnabled() {
      vm.form_readonly = false;
      vm.data_edit = {
        first_name: vm.selected_investor.first_name,
        last_name: vm.selected_investor.last_name,
        alias: vm.selected_investor.alias,
        gender: vm.selected_investor.gender,
        image_url: vm.selected_investor.image_url,
      }
    }

    function editDisabled() {
      vm.form_readonly = true;
    }

    function editInvestor() {
      var assoc_id = $routeParams.associationId;
      var inv_id = vm.selected_investor.id;
      investorService.update(assoc_id, inv_id, vm.data_edit)
      .then(function(response) {
        vm.selected_investor = response.data;
        vm.form_readonly = true;
        vm.investors[vm.index_selected_investor] = response.data;
        $mdToast.showSimple('Inversor editado exitosamente.');
      })
      .catch(function(response) {
        vm.form_readonly = true;
        $mdToast.showSimple('Error al añadir inversor.');
      });
    }

    // PRIVATE FUNCTIONS
    function getInvestors() {
      var id = $routeParams.associationId;
      investorService.getList(id)
      .then(function(response) {
          vm.investors = response.data;
      });
    }

    function getAvatars() {
      investorService.getAvatars()
      .then(function(response) {
          vm.men_avatars = response.data.men_avatars;
          vm.women_avatars = response.data.women_avatars;
      });
    }

    function showToastCreate($event) {
      $mdToast.showSimple('Inversor ' + vm.data.first_name + ' ' + vm.data.last_name + ' añadido exitosamente!');
    }

    function formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }

    function showDialogInvestorDetail($event) {
      $mdDialog.show({
        contentElement: '#investor-dialog-update',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        fullscreen: true,
      });
    }
}
