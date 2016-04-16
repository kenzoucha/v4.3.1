var StockDealAdmin = angular.module('StockDeal',[
   // 'StockDeal.products',

    //'StockDeal.repondre',
    //'StockDeal.products.service',
    //'StockDeal.categories',
   // 'StockDeal.categories.service',
    'StockDeal.scategories',
    'StockDeal.scategories.service',
    'StockDeal.users',
    'StockDeal.utils.service',
    'StockDeal.controllers',
    'StockDeal.directives',
    'StockDeal.filters',
    'StockDeal.factories',
    'ngResource',
    'ngMessages',
    'ui.router',
    'ngFileUpload',
])
.constant('API',{
        adminApi: '/api/admin'
})
.run(function($rootScope, $state, Auth, countUser){
    $rootScope.$on('$stateChangeStart', function(event, toState){
        Auth.session().then(function(data){
            $rootScope.auth = data.auth;

            userNumber=countUser.count();

           // $rootScope.auth = false;
            if(toState.authenticate && !data.auth){
                $state.transitionTo('login');
                event.preventDefault();
            }
        })
    })


})
.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('home', {
            url: '/',
            authenticate: true,
            template: '<h4>Bienvenu dans l\'espace administration de site Stock Deal</h4>'
        })
        .state('addProducts',{
            url: '/add',
            authenticate: false,
            views: {
                'add-view': {
                    templateUrl: 'src/products/view/product.add.html',
                    controller:'ProductCtr',
                }
            }
        })
        .state('addCategories',{
            url: '/addCategorie',
            authenticate: false,
            views: {
                'add-view': {
                    templateUrl: 'src/categories/view/categorie.add.html',
                    controller:'CategoriesCtr',
                }
            }

        })
        .state('addFournisseurs',{
            url: '/addFournisseurs',
            authenticate: false,
            views: {
                'add-view': {
                    templateUrl: 'src/fournisseurs/view/fournisseurs.add.html',
                    controller:'fournisseursCtr',
                }
            }

        })
        .state('listFournisseurs',{
            url: '/listFournisseurs',
            authenticate: false,
            views:{
                'list-view':{
                    templateUrl: 'src/fournisseurs/view/fournisseurs.html',
                    controller: 'listFouCtr',
                }
            }
        })
        .state('editFournisseurs',{
            url: '/edit/{_id:[0-9a-z]{24}}',
            authenticate: false,
            views: {
                'add-view': {
                    templateUrl: 'src/fournisseurs/view/fournisseurs.edit.html',
                    controller: 'editFournisseursCtr',
                }
            }
        })
        .state('listCategories',{
            url: '/listCategories',
            authenticate: false,
            views:{
                'list-view':{
                    templateUrl: 'src/categories/view/categories.list.html',
                    controller: 'listCategoriesCtr',
                }
            }
        })
        .state('editCategories',{
            url: '/edit/{_id:[0-9a-z]{24}}',
            authenticate: false,
            views: {
                'add-view': {
                    templateUrl: 'src/categories/view/categories.edit.html',
                    controller: 'editCategoriesCtr',
                }
            }
        })
        .state('logout',{
            url: '/logout',
            authenticate: true,
            views: {
                'home-view': {
                    controller: function(Auth,toaster,$state,$rootScope){
                        Auth.logout().then(function(data){
                            toaster.pop(data.status, null,data.message);
                            $state.transitionTo('login');
                        });
                    }
                }

            }
        })
       
        .state('login',{
            url: '/login',
            authenticate: false,
            views: {
                'home-view': {
                    templateUrl: 'templates/login.html',
                    controller: function($scope,Auth,$state,toaster){
                        $scope.login = function(){
                            Auth.login($scope.admin).then(function(data){
                                if(data.status === 'error'){
                                    toaster.pop(data.status, null,data.message);
                                }else{
                                    toaster.pop(data.status, null,data.message);
                                    $state.transitionTo('home');
                                }
                            });

                        }
                    }
                }
            }
        })
}]);

