
StockDealAdmin.controller('CategoriesCtr', ['$scope','categoriesService','$state','toaster', '$state',
    function($scope, categoriesService, $state, toaster, $state){
    $scope.addCategory = function () {
        console.log("designation :::",$scope.category);

        categoriesService.add($scope.category).then(function(data){
            console.log(":::::::",data);
            toaster.pop(data.status, null,data.message);
          //  $state.go('categories.list');
        });

    }

}])