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
    vm.goToAssociationItem = goToAssociationItem;
    vm.removeAssociation = removeAssociation;
    vm.createAssociation = createAssociation;
    vm.showDialogCreate = showDialogCreate;
    vm.hideDialogCreate = hideDialogCreate;
    vm.clearDialogCreate = clearDialogCreate;
    vm.showDialogRemove = showDialogRemove;


    getAssociations();

    // FUNCTIONS

    function getAssociations() {
      associationService.getList()
      .then(function(response) {
          vm.associations = response.data;
      });
    }

    function getTotalAssociations() {
      return vm.associations.length
    }

    function goToAssociationItem(id) {
      $location.path('/association/' + id);
    }

    function removeAssociation(id) {
      associationService.remove(id)
      .then(function(response) {
        getAssociations();
      });
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



    function showToastCreate($event) {
      $mdToast.showSimple('Asociación ' + vm.name + ' creada exitosamente!');
    };

    function showDialogRemove($event, id) {
      var dialogR = $mdDialog.confirm()
          .title('Borrar Asociación')
          .textContent('Estás seguro de querer borrar ésta asociación?')
          .ariaLabel('Lucky day')
          .targetEvent($event)
          .ok('Borrar')
          .cancel('Cancelar');
      $mdDialog.show(dialogR).then(function() {
        removeAssociation(id);
      });
    };
}



app.controller('AssociationItemCtrl', AssociationItemCtrl);

AssociationItemCtrl.$inject = ['associationService' , '$scope', '$routeParams', '$mdToast'];

function AssociationItemCtrl(associationService, $scope, $routeParams, $mdToast) {
    var vm = this;

    $scope.params = $routeParams;
    vm.view = {
      link: '',
      title: 'Detalle de Asociación',
      icon: 'business'
    };
    vm.association = {};

    getAssociationItem();

    // FUNCTIONS
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
}
