'use strict';

app.factory('investmentService', investmentService);

investmentService.$inject = ['$http', '$cookies'];

function investmentService($http, $cookies) {
  var service = {
    getList: getList,
  }

  return service
  ////////////

  // GET - LIST
  function getList(id) {
    return $http.get(
      "entity/associations/"+id+"/investments/"
    )
  }


}
