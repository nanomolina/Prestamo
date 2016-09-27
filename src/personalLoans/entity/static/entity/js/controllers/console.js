'use strict';


app.controller('ConsoleCtrl', ConsoleCtrl);
ConsoleCtrl.$inject = ['$scope', '$location'];

function ConsoleCtrl($scope, $location) {
    var vm = this;

    vm.view = {
      title: 'Console',
      icon: 'view_list'
    };
    vm.goToDetail = goToDetail;


    // PUBLIC FUNCTIONS
    function goToDetail() {
      var id = $scope.params.associationId;
      $location.path('/association/' + id + '/detail');
    }

    // PRIVATE FUNCTIONS
}
