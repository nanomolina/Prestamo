'use strict';

app.factory('associationService', associationService);

associationService.$inject = ['$http', '$cookies'];

function associationService($http, $cookies) {
  var service = {
    getList: getList,
    remove: remove,
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
    console.error('getAssociations failed');
    return error
  }

  function remove(id) {
    return $http.delete(
      "entity/associations/"+id+"/",
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
    .then(removeComplete)
    .catch(removeFailed);
  }

  function removeComplete(response) {
    console.log('removeAssociation success');
    return response
  }

  function removeFailed(error) {
    console.error('removeAssociation failed');
    return error
  }
}
