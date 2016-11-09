'use strict';

app.factory('investorService', investorService);

investorService.$inject = ['$http', '$cookies'];

function investorService($http, $cookies) {
  var service = {
    getList: getList,
    create: create,
    getAvatars: getAvatars,
    update: update,
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
  function update(id, data) {
    return $http.put(
      "entity/investor/"+id+"/",
      data,
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
  }
}
