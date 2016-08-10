'use strict';

app.controller('MainCtrl', function ($scope, $cookies, $location, djangoAuth, $mdSidenav) {

    $scope.login = function(){
      djangoAuth.login(prompt('Username'),prompt('password'))
      .then(function(data){
        handleSuccess(data);
      },handleError);
    }

    $scope.logout = function(){
      djangoAuth.logout()
      .then(handleSuccess,handleError);
    }

    $scope.resetPassword = function(){
      djangoAuth.resetPassword(prompt('Email'))
      .then(handleSuccess,handleError);
    }

    $scope.register = function(){
      djangoAuth.register(prompt('Username'),prompt('Password'),prompt('Email'))
      .then(handleSuccess,handleError);
    }

    $scope.verify = function(){
      djangoAuth.verify(prompt("Please enter verification code"))
      .then(handleSuccess,handleError);
    }

    $scope.goVerify = function(){
      $location.path("/verifyEmail/"+prompt("Please enter verification code"));
    }

    $scope.changePassword = function(){
      djangoAuth.changePassword(prompt("Password"), prompt("Repeat Password"))
      .then(handleSuccess,handleError);
    }

    $scope.profile = function(){
      djangoAuth.profile()
      .then(handleSuccess,handleError);
    }

    $scope.updateProfile = function(){
      djangoAuth.updateProfile({'first_name': prompt("First Name"), 'last_name': prompt("Last Name"), 'email': prompt("Email")})
      .then(handleSuccess,handleError);
    }

    $scope.confirmReset = function(){
      djangoAuth.confirmReset(prompt("Code 1"), prompt("Code 2"), prompt("Password"), prompt("Repeat Password"))
      .then(handleSuccess,handleError);
    }

    $scope.goConfirmReset = function(){
      $location.path("/passwordResetConfirm/"+prompt("Code 1")+"/"+prompt("Code 2"))
    }

    var handleSuccess = function(data){
      $scope.response = data;
    }

    var handleError = function(data){
      $scope.response = data;
    }

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


  app.controller('PrincipalCtrl', function ($scope, $mdSidenav) {
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
