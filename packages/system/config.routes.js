(function(){

  'use strict';
  //Setting up route
  angular
         .module('mean')
         .config(configState)
         .config(configLoaction);

  // config.$inject = ['$routeProvider','$locationProvider'];
  configState.$inject = ['$stateProvider','$urlRouterProvider'];
  configLoaction.$inject = ['$locationProvider'];


  function configState($stateProvider,$urlRouterProvider){
          // For unmatched routes:
      $urlRouterProvider.otherwise('/');

      // states for my app
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'system/views/index.html',
          controller:'IndexController',
          controllerAs:'idctr'
        });
  }

  function configLoaction($locationProvider){
    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }

})();
