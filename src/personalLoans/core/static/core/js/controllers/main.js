'use strict';

app.controller('MainCtrl', function ($scope, $http, $cookies, $location, djangoAuth, $mdSidenav) {

    //============================
    $scope.logged = true;
    $scope.$on("djangoAuth.logged_in", function(data){
      $scope.logged = false;
    });
    $scope.$on("djangoAuth.logged_out", function(data){
      $scope.logged = true;
    });
    //=============================
    $scope.isSidenavOpen = false;

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.menu = [
      {
        link : '',
        title: 'Consola Principal',
        icon: 'dashboard'
      },
      {
        link : '/#/investors',
        title: 'Grupo de Inversores',
        icon: 'group'
      },
    ];
    $scope.admin = [
      {
        link: '#/logout',
        title: 'Cerrar Sesión',
        icon: 'exit_to_app'
      },
    ];

  });


  app.controller('PrincipalCtrl', function ($scope, $mdSidenav, $http) {

    //=============================
    $http.get("rest-auth/user")
    .then(function(response) {
        $scope.profile = response.data;
    });
    //=============================

    $scope.isSidenavOpen = false;

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.menu = [
      {
        link : '#/',
        title: 'Consola Principal',
        icon: 'dashboard'
      },
      {
        link : '#/investors',
        title: 'Grupo de Inversores',
        icon: 'group'
      },
    ];

    $scope.admin = [
      {
        link: '#/logout',
        title: 'Cerrar Sesión',
        icon: 'exit_to_app'
      },
    ];

  });
