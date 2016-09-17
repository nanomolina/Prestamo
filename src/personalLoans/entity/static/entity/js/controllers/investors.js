'use strict';

app.controller('InvestorCtrl', InvestorCtrl);

InvestorCtrl.$inject = ['investorService', '$mdDialog', '$scope', '$mdToast'];

function InvestorCtrl(investorService, $mdDialog, $scope, $mdToast) {
    var vm = this;

    vm.first_name;
    vm.last_name;
    vm.alias;
    vm.dni;
    vm.phone;
    vm.email;
    vm.birthdate;
    vm.gender = '1';
    vm.image_url;
    vm.investors = [];
    vm.men_avatars = [];
    vm.women_avatars = [];
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    vm.clearDialogCreate = clearDialogCreate;
    vm.createInvestor = createInvestor;
    vm.is_male = is_male;
    vm.is_female = is_female;
    vm.chooseAvatar = chooseAvatar;


    // INIT FUNCTIONS
    getInvestors();
    getAvatars();


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
      vm.alias = '';
      vm.dni = '';
      vm.phone = '';
      vm.email = '';
      vm.birthdate = '';
      vm.gender = '1';
      vm.image_url = '';
    }

    function createInvestor() {
      if ($scope.investorForm.$valid) {
        var id = $scope.params.associationId;
        var data = {
          first_name: vm.first_name,
          last_name: vm.last_name,
          alias: vm.alias,
          phone: vm.phone,
          email: vm.email,
          birthdate: formatDate(vm.birthdate),
          gender: vm.gender,
          image_url: vm.image_url,
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

    function is_male(gender) {
      return gender == '1';
    }

    function is_female(gender) {
      return gender == '2';
    }

    function chooseAvatar(index) {
      if (is_male(vm.gender)) {
        vm.image_url = vm.men_avatars[index];
      } else {
        vm.image_url = vm.women_avatars[index];
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

    function getAvatars() {
      investorService.getAvatars()
      .then(function(response) {
          vm.men_avatars = response.data.men_avatars;
          vm.women_avatars = response.data.women_avatars;
      });
    }

    function showToastCreate($event) {
      $mdToast.showSimple('Inversor ' + vm.first_name + ' ' + vm.last_name + ' añadido exitosamente!');
    };

    function formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }

}
