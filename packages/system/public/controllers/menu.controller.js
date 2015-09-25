(function(){
  'use strict';
  angular
      .module('mean.system')
      .controller('MenuController', MenuController);

      MenuController.$inject = ['Global','MeanUser','$rootScope','$state'];

      function MenuController(Global, MeanUser,$rootScope,$state){
          var vm = this;
          vm.logout = MeanUser.logout;
          $rootScope.$on('logout', function() {
            $state.go('auth.login');
          });
      }
})();
