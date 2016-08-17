'use strict';

app.controller('AssociationCtrl', AssociationCtrl);

AssociationCtrl.$inject = ['associationService'];

function AssociationCtrl(associationService) {
    var vm = this;
    vm.accent = 'purple';
    vm.view = {
      link: '#/association',
      title: 'Asociaciones',
      icon: 'business'
    };
    vm.associations = associationService.list();
}
