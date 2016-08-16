'use strict';

app.controller('AssociationCtrl', function($scope, $http) {
    $http.get("entity/associations/")
    .then(function(response) {
        $scope.associations = response.data;
    });
  });
