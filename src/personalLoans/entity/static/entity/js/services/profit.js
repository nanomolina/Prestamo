'use strict';

app.factory('profitService', profitService);

profitService.$inject = ['$http', '$cookies'];

function profitService($http, $cookies) {
  var service = {
    getList: getList,
  }

  return service
  ////////////

  // GET - LIST
  function getList(id, query) {
    return $http.get(
      "entity/associations/"+id+"/profits/",
      {
        params: query,
      }
    )
  }
}
