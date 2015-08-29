(function(){
  'use strict';
  angular
        .module('mean.users')
        .controller('RegisterCtrl',RegisterCtrl);

        RegisterCtrl.$inject = ['Global','$http','$state'];

        function RegisterCtrl(Global,$http,$state){
          var vm = this;
              vm.user = {};
              vm.global = Global;

              vm.register = register;

              function register(){
                $http.post('/api/users',vm.user)
                .then(function(user){

                    vm.global.user = user;
                    vm.global.authenticate = true;

                    $state.go('home');

                },function(err){
                
                  vm.registerErrors = err.data.errors;
                });
              }

        }
})();
