'use strict';


app.controller('ConsoleCtrl', ConsoleCtrl);
ConsoleCtrl.$inject = ['$routeParams', '$location'];

function ConsoleCtrl($routeParams, $location) {
    var vm = this;

    vm.view = {
      title: 'Console',
      icon: 'view_list'
    };
    vm.goToDetail = goToDetail;
    vm.goToLoans = goToLoans;

    // PUBLIC FUNCTIONS
    function goToDetail() {
      var id = $routeParams.associationId;
      $location.path('/association/' + id + '/detail');
    }

    function goToLoans() {
      var id = $routeParams.associationId;
      $location.path('/association/' + id + '/loans');
    }

    // PRIVATE FUNCTIONS
}
