
StockDealAdmin.factory('categoriesService',['$resource','API','$q','$http', function($resource,API,$q,$http){
    var Category = $resource(API.adminApi + '/category/:_id',null,{
        'update': {method: 'PUT', params: {_id: '@_id'}}
    });
    var factory = {};
    factory.all = function(){
        return Category.query();
    }
    factory.get = function(id){
        return Category.get(id);
    }
    factory.category = Category;

    factory.add = function(category){
        console.log("!!!!!!!!!!!!!!!!!!");
        var deferred = $q.defer();
        $http.post(API.adminApi + '/category', category)
            .success(function(data){
                console.log("!!!!!!!!!!!!!!!!!!");
                deferred.resolve(data);
            }).error(function(err){
            console.error("factory.addCategories error:::",err);
            deferred.reject(err);
        })
        return deferred.promise;
    }
    
    return factory;


}]);