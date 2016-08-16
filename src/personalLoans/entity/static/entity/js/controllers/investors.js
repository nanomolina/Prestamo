'use strict';

app.controller('InvestorCtrl', function($scope) {
    $scope.view = {
      link: '#/investors',
      title: 'Grupo de Inversores',
      icon: 'group'
    };

    $scope.investor_group = [{
        who: 'nano',
        what: 'algo',
        notes: 'notes',
    }];

  });
