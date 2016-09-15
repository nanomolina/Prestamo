'use strict';

app.factory('investorService', investorService);

investorService.$inject = ['$http', '$cookies'];

function investorService($http, $cookies) {
  var service = {
    getList: getList,
    create: create,
  }

  return service
  ////////////

  // GET - LIST
  function getList(id) {
    return $http.get(
      "entity/associations/"+id+"/investors/"
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

}
