(function(){

  'use strict';
  //Setting up route
  angular
         .module('mean')
         .config(configState)
         .config(configLoaction)
         .run(function($rootScope, $state) {
             $rootScope.$state = $state;
         });

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
          controllerAs:'idctr',
          resolve: {
          loggedin: function(MeanUser) {
                  return MeanUser.checkLoggedin();
              }
           }
        });
  }

  function configLoaction($locationProvider){
    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }

})();
