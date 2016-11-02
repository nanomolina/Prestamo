'use strict';

app.factory('revenueService', revenueService);

revenueService.$inject = ['$http', '$cookies'];

function revenueService($http, $cookies) {
  var service = {
    getList: getList,
  }

  return service
  ////////////

  // GET - LIST
  function getList(id, query) {
    return $http.get(
      "entity/associations/"+id+"/revenue/",
      {
        params: query,
      }
    )
  }
}
