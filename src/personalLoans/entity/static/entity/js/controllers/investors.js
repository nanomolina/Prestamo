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
    vm.investors = [];
    vm.men_avatars = [];
    vm.women_avatars = [];
    vm.is_selected_investor = false;
    vm.selected_investor;
    vm.create_loading = false;
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    vm.clearDialogCreate = clearDialogCreate;
    vm.createInvestor = createInvestor;
    vm.is_male = is_male;
    vm.is_female = is_female;
    vm.chooseAvatar = chooseAvatar;
    vm.selectInvestor = selectInvestor;


    // INIT FUNCTIONS
    getInvestors();
    getAvatars();
    $scope.master.updateSideNav();


    // PUBLIC FUNCTIONS
    function showDialogCreate($event) {
      $mdDialog.show({
        targetEvent: $event,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        fullscreen: true,
        templateUrl: 'entity/members/_add_investor.html',
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

    function chooseAvatar(index, event) {
      var element = angular.element(document.querySelector('.avatar-selected'));
      var target = angular.element(event.target);
      if (!target.hasClass('md-button')){
        var target = angular.element(event.target.parentElement);
      }
      element.removeClass('avatar-selected');
      target.addClass('avatar-selected');
      if (is_male(vm.data.gender)) {
        vm.data.image_url = vm.men_avatars[index];
      } else {
        vm.data.image_url = vm.women_avatars[index];
      }
    }

    function selectInvestor(index, event) {
      vm.selected_investor = vm.investors[index];
      vm.is_selected_investor = true;
      showDialogInvestorDetail(event);
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
        targetEvent: $event,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        fullscreen: true,
        templateUrl: 'entity/members/_investor_detail.html',
      });
    }
}
