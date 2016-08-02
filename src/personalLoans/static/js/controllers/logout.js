'use strict';

app.controller('LogoutCtrl', function ($scope, $location, djangoAuth) {
    djangoAuth.logout();
  });
