(function(){
  'use strict';
  angular
      .module('mean.system')
      .controller('IndexController',IndexController);

      IndexController.inject = ['Global'];

      function IndexController(Global){
        var vm = this;
        vm.global = Global;
      }
  
})();
