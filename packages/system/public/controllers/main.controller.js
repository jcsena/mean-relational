 (function(){
   'use strict';
   angular
       .module('mean.system')
       .controller('MainCtrl', MainCtrl);

       MainCtrl.$inject = [];

  function MainCtrl() {
      var vm = this;
      vm.userName = 'Example user';
      vm.helloText = 'Welcome in SeedProject';
      vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
  }

 })();
