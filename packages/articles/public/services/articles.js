//Articles service used for articles REST endpoint
(function(){
  'use strict';

  angular
      .module('mean.articles')
      .factory('Articles',Articles);

      Articles.$inject = ['$resource'];

      function Articles($resource){

        return $resource('api/articles/:articleId', {
            articleId: '@id'
        }, {
            update:{method: 'PUT'}
        });


      }
})();
