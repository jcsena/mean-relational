(function(){

  'use strict';


  angular
      .module('mean.system')
      .factory('httpInterceptor', httpInterceptor)
      .config(config);


      httpInterceptor.$inject = ['$q', '$location'];

      function httpInterceptor ($q, $location) {
        return {
          'response': function(response) {
            if (response.status === 401) {
              $location.path('/auth/login');
              return $q.reject(response);
            }
            return response || $q.when(response);
          },

          'responseError': function(rejection) {

            if (rejection.status === 401) {
              $location.url('/auth/login');
              return $q.reject(rejection);
            }
            return $q.reject(rejection);
          }

        };
      }

    //Http Interceptor to check auth failures for XHR requests
    config.$inject = ['$httpProvider'];

    function config($httpProvider){
      $httpProvider.interceptors.push('httpInterceptor');
    }

})();
