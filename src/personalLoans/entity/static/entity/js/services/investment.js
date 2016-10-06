'use strict';

app.factory('investmentService', investmentService);

investmentService.$inject = ['$http', '$cookies'];

function investmentService($http, $cookies) {
  var service = {
    getList: getList,
    getOptions: getOptions,
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

  function getOptions(id) {
    return $http.options(
      "entity/associations/"+id+"/investments/"
    )
  }

}
