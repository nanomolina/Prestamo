'use strict';

app.controller('AssociationCtrl', AssociationCtrl);

AssociationCtrl.$inject = ['associationService', '$location', '$mdDialog', '$scope', '$mdToast'];

function AssociationCtrl(associationService, $location, $mdDialog, $scope, $mdToast) {
    var vm = this;

    vm.view = {
      link: '#/association',
      title: 'Asociaciones',
      icon: 'business'
    };
    vm.name;
    vm.description;
    vm.associations = [];
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
      $location.path('/association/' + id + '/console');
    }

    function createAssociation() {
      if ($scope.associationForm.$valid) {
        var data = {name: vm.name, description: vm.description};
        associationService.create(data)
        .then(function(response) {
          vm.associations.push(response.data);
          hideDialogCreate();
          showToastCreate();
        }).catch(function(response) {
          $mdToast.showSimple('Error al crear asociación!');
        });
      }
    }

    function showDialogCreate($event) {
      $mdDialog.show({
        targetEvent: $event,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        templateUrl: 'entity/_add_association.html',
      });
    }

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



app.controller('AssociationItemCtrl', AssociationItemCtrl);

AssociationItemCtrl.$inject = ['associationService' , '$scope', '$routeParams', '$mdToast', '$mdDialog'];

function AssociationItemCtrl(associationService, $scope, $routeParams, $mdToast, $mdDialog) {
    var vm = this;

    $scope.params = $routeParams;
    vm.view = {
      link: '',
      title: 'Detalle de Asociación',
      icon: 'business'
    };
    vm.name;
    vm.description;
    vm.association = {};
    vm.showDialogEdit = showDialogEdit
    vm.clearDialogEdit = clearDialogEdit;
    vm.hideDialogCreate = hideDialogCreate;
    vm.editAssociation = editAssociation;

    getAssociationItem();


    // PUBLIC FUNCTIONS
    function showDialogEdit($event) {
      vm.name = vm.association.name;
      vm.description = vm.association.description;
      $mdDialog.show({
        targetEvent: $event,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        templateUrl: 'entity/_edit_association.html',
      });
    }

    function clearDialogEdit() {
      vm.name = '';
      vm.description = '';
    }

    function hideDialogCreate() {
      $mdDialog.hide();
    }

    function editAssociation() {
      if ($scope.associationForm.$valid) {
        var id = $scope.params.associationId;
        var data = {name: vm.name, description: vm.description};
        associationService.update(id, data)
        .then(function(response) {
          vm.association = response.data;
          hideDialogCreate();
          showToastEdit();
        }).catch(function(response) {
          $mdToast.showSimple('Error al crear asociación!');
        });
      }
    }

    // PRIVATE FUNCTIONS
    function getAssociationItem() {
      var id = $scope.params.associationId;
      associationService.get(id)
      .then(function(response) {
        vm.association = response.data;
      })
      .catch(function(error) {
        $mdToast.showSimple('Error al buscar asociación!');
      })
    }

    function showToastEdit($event) {
      $mdToast.showSimple('Asociación editada exitosamente!');
    };
}
