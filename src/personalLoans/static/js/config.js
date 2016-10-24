'use strict';

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('indigo');
});

app.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
   return moment(date).format('DD/MM/YYYY');
  };
});
