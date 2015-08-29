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
                loggedin: checkLoggedOut
          }
      })
      .state('auth.register',{
        url: '/register',
        templateUrl: 'users/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rgctr',
        resolve: {
                loggedin: checkLoggedOut
          }
      });

  }
   function checkLoggedOut ($q, $timeout, $http, $location) {
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/api/loggedin').success(function(user) {
            // Authenticated
            if (user !== '0') {
                $timeout(deferred.reject);
                $location.url('/');
            }

            // Not Authenticated
            else {
              $timeout(deferred.resolve);
            }
        });

        return deferred.promise;
    }




})();
