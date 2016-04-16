
StockDealAdmin.controller('editCategoriesCtr',['$scope', '$stateParams', 'utils', '$state', 'toaster', 'categoriesService',
    function($scope, $stateParams, utils, $state, toaster, categories){
        $scope.focus = true;
        $scope.category = categories.get($stateParams);
        $scope.editCategory = function () {
            console.log("categories edit")
            $scope.category.$update(function(data){
                //$scope.categories.slice($scope.categories.indexOf($scope.category),1);
                // $scope.categories.push(data.cat);
                toaster.pop(data.status, null,data.message);
                $state.go('listCategories');
            });
        }
    }])