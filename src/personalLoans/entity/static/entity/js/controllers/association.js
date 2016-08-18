'use strict';

app.controller('AssociationCtrl', AssociationCtrl);

AssociationCtrl.$inject = ['associationService'];

function AssociationCtrl(associationService) {
    var vm = this;

    vm.view = {
      link: '#/association',
      title: 'Asociaciones',
      icon: 'business'
    };
    vm.accent = 'purple';
    vm.associations;

    getAssociations();

    function getAssociations() {
      associationService.getList()
      .then(function(data) {
          vm.associations = data;
      });
    }

}
