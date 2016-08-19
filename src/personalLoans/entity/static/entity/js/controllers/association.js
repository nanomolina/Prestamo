'use strict';

app.controller('AssociationCtrl', AssociationCtrl);

AssociationCtrl.$inject = ['associationService', '$mdDialog', '$scope'];

function AssociationCtrl(associationService, $mdDialog, $scope) {
    var vm = this;

    vm.view = {
      link: '#/association',
      title: 'Asociaciones',
      icon: 'business'
    };
    vm.name;
    vm.description;
    vm.associations = [];
    vm.removeAssociation = removeAssociation;
    vm.createAssociation = createAssociation;
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;

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

    function createAssociation() {
      var data = {name: vm.name, description: vm.description};
      associationService.create(data)
      .then(function(response) {
        vm.associations.push(response.data);
        hideDialogCreate();
      });
    }

    function showDialogCreate($event) {
      $mdDialog.show({
        targetEvent: $event,
        scope: $scope,
        preserveScope: true,
        templateUrl: 'entity/_add_association.html',
      });
    }

    function hideDialogCreate() {
        $mdDialog.hide();
    }
}
