angular
  .module('personal-loans')
  .config(routes);


function routes($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'rendered-partials/main.html',
    controller: 'MainCtrl as vm',
    resolve: {
      authenticated: ['djangoAuth', function(djangoAuth){
        return djangoAuth.authenticationStatus();
      }],
    }
  })
}