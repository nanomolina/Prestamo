'use strict';

app.factory('associationService', associationService);

associationService.$inject = ['$http'];

function associationService($http) {
  var service = {
    list: list,
  }
  return service
  ////////////

  function list() {
    $http.get("entity/associations/")
    .then(function(response) {
        return response.data
    }).catch(function(error) {
        return error
    });
  }
}
