'use strict';

app.factory('associationService', associationService);

associationService.$inject = ['$http'];

function associationService($http) {
  var service = {
    getList: getList,
  }
  return service
  ////////////

  function getList() {
    return $http.get("entity/associations/")
      .then(getListComplete)
      .catch(getListFailed);
  }

  function getListComplete(response) {
    return response.data
  }

  function getListFailed(error) {
    console.error('getAssociations failed: ' + error);
  }
}
