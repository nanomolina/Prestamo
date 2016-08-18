'use strict';

app.controller('AssociationCtrl', AssociationCtrl);

AssociationCtrl.$inject = ['associationService', '$mdDialog'];

function AssociationCtrl(associationService, $mdDialog) {
    var vm = this;

    vm.view = {
      link: '#/association',
      title: 'Asociaciones',
      icon: 'business'
    };
    vm.name;
    vm.description;
    vm.associations;
    vm.removeAssociation = removeAssociation;
    vm.createAssociation = createAssociation;
    vm.showDialogCreate = showDialogCreate;

    getAssociations();

    // FUNCTIONS

    function getAssociations() {
      associationService.getList()
      .then(function(data) {
          vm.associations = data;
      });
    }

    function removeAssociation(id) {
      associationService.remove(id)
      .then(function(response) {
        getAssociations();
      });
    }

    function createAssociation(id) {
      var data = {name: vm.name, description: vm.description};
      associationService.create(id, data)
      .then(function(response) {
        getAssociations();
      });
    }

    function showDialogCreate($event) {
      $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'entity/_add_association.html',
        locals: {
          name: vm.name,
          description: vm.description,
          createAssociation: vm.createAssociation,
        },
        controller: DialogController
      });
      function DialogController($mdDialog, name, description, createAssociation) {
        vm.name = name;
        vm.description = description;
        vm.createAssociation = createAssociation;
        vm.closeDialog = function() {
          $mdDialog.hide();
        }
      }
    }
}
