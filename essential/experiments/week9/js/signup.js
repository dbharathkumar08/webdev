var app = angular.module('ModalTest', ['ui.bootstrap']);

app.controller('NavController', function ($scope, $modal) {
   // $scope.items = ['item1', 'item2', 'item3'];
    $scope.launch = function () {
        $modal.open({
            templateUrl: 'partials/signup-page.html',
            controller: 'ModalInstanceCtrl'
           
        });
        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    $log.info('Modal dismissed at: ' + new Date());
        //});
    };
});

app.controller('ModalInstanceCtrl', function ($scope, $modal) {
    console.log("hello");
});

//var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

//    $scope.items = items;
//    $scope.selected = {
//        item: $scope.items[0]
//    };

//    $scope.ok = function () {
//        $modalInstance.close($scope.selected.item);
//    };

//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };
//};
