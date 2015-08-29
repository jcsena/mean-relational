(function(){

  'use strict';
  angular.module('mean.users')
      .controller('LoginCtrl', LoginCtrl);

      LoginCtrl.$inject = ['$rootScope', '$http', '$location'];

      function LoginCtrl($rootScope, $http, $location){

            // This object will be filled by the form
            var vm = this;

            vm.user = {};

            // Register the login() function
            vm.login = function() {
                $http.post('/api/login', {
                    email: vm.user.email,
                    password: vm.user.password
                })
                    .success(function(response) {
                        // authentication OK
                        vm.loginError = 0;

                        if (response.redirect) {
                            if (window.location.href === response.redirect) {
                                //This is so an admin user will get full admin page
                                window.location.reload();
                            } else {
                                window.location = response.redirect;
                            }
                        } else {
                            $location.url('/');
                        }
                    })
                    .error(function() {
                        vm.loginerror = 'Authentication failed.';
                    });
            };

      }

})();
