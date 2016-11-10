'use strict';

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('amber')
    .warnPalette('brown')
    .backgroundPalette('blue-grey');
});

app.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
   return moment(date).format('DD/MM/YYYY');
  };
});
