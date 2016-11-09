'use strict';

app.controller('AssociationCtrl', AssociationCtrl);

AssociationCtrl.$inject = ['associationService', '$location', '$mdDialog', '$scope', '$mdToast'];

function AssociationCtrl(associationService, $location, $mdDialog, $scope, $mdToast) {
    var vm = this;

    $scope.master.toolbar = {title: 'Asociaciones', icon: 'static/img/business/cityscape.svg'}
    vm.name;
    vm.description;
    vm.associations = [];
    vm.general_loading = false;
    vm.create_loading = false;
    vm.getTotalAssociations = getTotalAssociations;
    vm.goToConsole = goToConsole;
    vm.createAssociation = createAssociation;
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    vm.clearDialogCreate = clearDialogCreate;
    vm.showDialogRemove = showDialogRemove;


    getAssociations();

    // PUBLIC FUNCTIONS
    function getTotalAssociations() {
      return vm.associations.length
    }

    function goToConsole(id) {
      vm.general_loading = true;
      $location.path('/association/' + id + '/console');
    }

    function createAssociation() {
      if ($scope.associationForm.$valid) {
        vm.create_loading = true;
        var data = {name: vm.name, description: vm.description};
        associationService.create(data)
        .then(function(response) {
          vm.associations.push(response.data);
          hideDialogCreate();
          showToastCreate();
          vm.create_loading = false;
        }).catch(function(response) {
          $mdToast.showSimple('Error al crear asociación!');
          vm.create_loading = false;
        });
      }
    }

    function showDialogCreate($event) {
      $mdDialog.show({
        contentElement: '#myStaticDialog',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        fullscreen: true,
      });
    };

    function hideDialogCreate() {
      $mdDialog.hide();
    }

    function clearDialogCreate() {
      vm.name = '';
      vm.description = '';
    }

    function showDialogRemove($event, id) {
      var dialogR = $mdDialog.confirm()
          .title('Borrar Asociación')
          .textContent('Estás seguro de querer borrar ésta asociación?')
          .ariaLabel('Lucky day')
          .targetEvent($event)
          .ok('Borrar')
          .cancel('Cancelar')
          .clickOutsideToClose(true);
      $mdDialog.show(dialogR).then(function() {
        removeAssociation(id);
      });
    };


    // PRIVATE FUNCTIONS
    function getAssociations() {
      associationService.getList()
      .then(function(response) {
          vm.associations = response.data;
      });
    }

    function removeAssociation(id) {
      associationService.remove(id)
      .then(function(response) {
        getAssociations();
      });
    }

    function showToastCreate($event) {
      $mdToast.showSimple('Asociación ' + vm.name + ' creada exitosamente!');
    };
}
