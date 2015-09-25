(function(){

  'use strict';
  //Setting up route
  angular
         .module('mean.articles')
         .config(config);

  config.$inject = ['$stateProvider'];


  function config($stateProvider){

      // states for my app
      $stateProvider
        .state('articles', {
          url: '/all-articles',
          templateUrl: '/articles/views/list.html',
          controller: 'ArticlesController',
          controllerAs: 'arctr'
        })
        .state('create-article', {
          url: '/articles/create',
          templateUrl: 'articles/views/create.html',
          controller: 'ArticlesController',
          controllerAs: 'arctr'
        })
        .state('edit article', {
            url: '/articles/:articleId/edit',
            templateUrl: 'articles/views/edit.html',
            controller: 'ArticlesController',
            controllerAs: 'arctr'
        })
        .state('view article', {
            url:'/articles/:articleId',
            templateUrl: 'articles/views/view.html',
            controller: 'ArticlesController',
            controllerAs: 'arctr'
        });

  }

})();
