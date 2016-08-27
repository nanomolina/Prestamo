'use strict';

app.factory('associationService', associationService);

associationService.$inject = ['$http', '$cookies'];

function associationService($http, $cookies) {
  var service = {
    getList: getList,
    create: create,
    remove: remove,
  }

  return service
  ////////////

  // GET - LIST
  function getList() {
    return $http.get(
      "entity/associations/"
    )
  }

  // POST - CREATE
  function create(data) {
    return $http.post(
      "entity/associations/",
      data,
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
  }

  //  GET - RETRIEVE
  function get(id) {
    return $http.get(
      "entity/associations/"+id+"/"
    )
  }

  // DELETE - DESTROY
  function remove(id) {
    return $http.delete(
      "entity/associations/"+id+"/",
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
  }

}
