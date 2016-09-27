'use strict';


app.controller('ConsoleCtrl', ConsoleCtrl);
ConsoleCtrl.$inject = [];

function ConsoleCtrl() {
    var vm = this;

    vm.view = {
      title: 'Console',
      icon: 'view_list'
    };
}
