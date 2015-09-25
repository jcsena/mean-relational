'use strict';

(function(){
    angular
      .module('mean.articles')
      .controller('ArticlesController',ArticlesController);

      ArticlesController.$inject = ['$stateParams', '$location', 'Global', 'Articles','$state'];

      function  ArticlesController($stateParams, $location, Global, Articles,$state){
        var vm = this;
        vm.global = Global;

        //declare and use methods
        vm.create = create;
        vm.remove = remove;
        vm.update = update;
        vm.find = find;
        vm.findOne = findOne;

        //methods
         function create() {
            var article = new Articles({
                title: vm.title,
                content: vm.content
            });

            article.$save(function(response) {
                $location.path('articles/' + response.id);
            });

            vm.title = '';
            vm.content = '';
        }

        function remove(article) {
            if (article) {
                article.$remove();

                for (var i in vm.articles) {
                    if (vm.articles[i] === article) {
                        vm.articles.splice(i, 1);
                    }
                }
            }
            else {
                vm.article.$remove(function(){
                  $state.go('articles');
                });
            }
        }

      function update() {
            var article = vm.article;
            if (!article.updated) {
                article.updated = [];
            }
            article.updated.push(new Date().getTime());

            article.$update(function() {
                $location.path('articles/' + article.id);
            });
        }

        function find() {
            Articles.query(function(articles) {
                vm.articles = articles;
            });
        }

      function findOne() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                vm.article = article;
            });
        }

      }

})();
