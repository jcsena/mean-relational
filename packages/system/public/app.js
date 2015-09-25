'use strict';
angular.module('mean', [
  /* angular modules */
  'ngCookies',
  'ngResource',

  /*3rd-party modules*/
  'ui.router',
  'ui.bootstrap',

  /*feature areas*/
  'mean.system',
  'mean.articles',
  'mean.users'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.users',[]);
