(function(){

  'use strict';
  //Setting up route
  angular
         .module('mean.users')
         .config(config);

  config.$inject = ['$stateProvider'];


  function config($stateProvider){

      // states for my app
      $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'users/views/auth.html'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'users/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'lgctr',
        resolve: {
                loggedin: function(MeanUser){
                  MeanUser.checkLoggedOut();
                }
          }
      })
      .state('auth.register',{
        url: '/register',
        templateUrl: 'users/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rgctr',
        resolve: {
                loggedin: function(MeanUser) {
                  MeanUser.checkLoggedOut();
                }
          }
      });

  }

})();
