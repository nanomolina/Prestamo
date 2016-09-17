'use strict';

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});

app.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
   return moment(date).format('DD/MM/YYYY');
  };
});
