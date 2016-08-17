'use strict';

app.controller('AssociationCtrl', function($scope, $http) {
    $scope.accent = 'purple';
    $scope.view = {
      link: '#/association',
      title: 'Asociaciones',
      icon: 'business'
    };
    $http.get("entity/associations/")
    .then(function(response) {
        $scope.associations = response.data;
    });
  });
