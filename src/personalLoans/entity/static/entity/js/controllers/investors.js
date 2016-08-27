'use strict';

app.controller('InvestorCtrl', InvestorCtrl);

InvestorCtrl.$inject = ['associationService', '$mdDialog', '$scope', '$mdToast'];

function InvestorCtrl(associationService) {
    var vm = this;

    vm.view = {
      link: '#/investors',
      title: 'Grupo de Inversores',
      icon: 'group'
    };
    vm.investors = [];


    // FUNCTIONS

}
