
StockDealAdmin.controller('listCategoriesCtr',['$scope','categoriesService', '$stateParams', 'utils', '$state','toaster',
    function ( $scope,categories, $stateParams, utils, $state,toaster) {
       var Category = categories.category;
            $scope.categories = categories.all()
        $scope.deleteCategory= function(id){
            if(confirm('Voulez vous vraiment suppirmer cet categories')){
                Category.delete({_id: id},function (res) {
                    if(res.status === 'error'){
                        toaster.pop(res.status, null,res.message);
                    }else{
                        var obj = utils.findById($scope.categories,id);
                        $scope.categories.splice($scope.categories.indexOf(obj),1);
                        toaster.pop(res.status, null,res.message);
                    }
                });
            }
            return false;
        }

        $scope.edit= function(id) {
            //ui-sref="categories.edit({_id:cat._id})"
            $state.go("editCategories",{_id:id});

        }

}])