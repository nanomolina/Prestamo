'use strict';

app.factory('authService', authService);

authService.$inject = ['$q', '$http', '$cookies', '$rootScope'];

function authService($q, $http, $cookies, $rootScope) {
  var service = {
    login: login,
    logout: logout,
    getUser: getUser,
  }

  return service
  ////////////

  // POST - LOGIN
  function login(data) {
    return $http.post(
      "rest-auth/login/",
      data,
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    )
  }

  function logout() {
    var auth_user = this;
    return $http.post(
      "rest-auth/logout/", {},
      {
        withCredentials: true,
        headers: {'X-CSRFToken': $cookies.get('csrftoken')},
      }
    ).then(function(data){
        delete $http.defaults.headers.common.Authorization;
        delete $cookies.token;
        // auth_user.authenticated = false;
        $rootScope.$broadcast("authService.logged_out");
    });
  }

  function getUser() {
    return $http.get(
      "rest-auth/socialuser/"
    )
  }

}
