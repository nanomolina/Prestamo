'use strict';

app.factory('investorService', investorService);

investorService.$inject = ['$http', '$cookies'];

function investorService($http, $cookies) {
  var service = {
    getList: getList,
    create: create,
    getAvatars: getAvatars,
    update: update,
    remove: remove,
  }

  return service
  ////////////

  // GET - LIST
  function getList(id) {
    return $http.get(
      "entity/associations/"+id+"/investors/"
    )
  }

  // GET - AVATARS
  function getAvatars() {
    return $http.get(
      "entity/avatars/"
    )
  }

  // POST - CREATE
  function create(id, data) {
    return $http.post(
      "entity/associations/"+id+"/investors/",
      data,
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
  }

  // PUT - UPDATE
  function update(assoc_id, inv_id, data) {
    return $http.put(
      "entity/associations/"+assoc_id+"/investor/"+inv_id+"/",
      data,
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
  }

  // DELETE - DESTROY
  function remove(assoc_id, inv_id) {
    return $http.delete(
      "entity/associations/"+assoc_id+"/investor/"+inv_id+"/",
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
  }

}
