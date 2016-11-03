'use strict';

app.factory('investmentService', investmentService);

investmentService.$inject = ['$http', '$cookies'];

function investmentService($http, $cookies) {
  var service = {
    getList: getList,
    getTotal: getTotal,
    getOptions: getOptions,
    create: create,
  }

  return service
  ////////////

  // GET - LIST
  function getList(id, query) {
    return $http.get(
      "entity/associations/"+id+"/investments/",
      {
        params: query,
      }
    )
  }

  // GET - TOTAL
  function getTotal(id, query) {
    return $http.get(
      "entity/associations/"+id+"/investments/total/",
      {
        params: query,
      }
    )
  }

  // OPTIONS
  function getOptions(id) {
    return $http(
      {method: "OPTIONS", url: "entity/associations/"+id+"/investments/"}
    )
  }

  // POST - CREATE
  function create(id, data) {
    return $http.post(
      "entity/associations/"+id+"/investments/",
      data,
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
  }

}
