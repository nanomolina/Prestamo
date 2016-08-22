'use strict';

app.factory('associationService', associationService);

associationService.$inject = ['$http', '$cookies'];

function associationService($http, $cookies) {
  var service = {
    getList: getList,
    remove: remove,
    create: create,
  }

  return service
  ////////////

  // GET
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

  // DELETE
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

  // POST
  function create(data) {
    return $http.post(
      "entity/associations/",
      data,
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
    .then(createComplete)
    .catch(createFailed);
  }

  function createComplete(response) {
    console.log('createAssociation success');
    return response
  }

  function createFailed(error) {
    console.error('createAssociation failed');
    return error
  }
}
