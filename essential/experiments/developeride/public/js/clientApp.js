var app = angular.module("DeveloperApp", []);

app.controller("DeveloperController", function ($scope, $http) {
    
    $http.get('/developer')
   .success(function (response) {
       $scope.developers = response;
   });

    $scope.remove = function (index) {
        $http.delete('/developer/' + index)
        .success(function (response) {
            $scope.developers = response;
        });
    };

    $scope.add = function (developer) {
        
        $http.post('/developer',developer)
        .success(function (response) {
            $scope.developers = response;
        });
    };

    $scope.selectedIndex = null;
    $scope.select = function (index) {
        $scope.selectedIndex = index;
        $scope.developer = $scope.developers[index];
    };

    $scope.update = function (developer) {
        $http.put('/developer/' + $scope.selectedIndex, developer)
        .success(function (response) {
            $scope.developers = response;
        });
    };
});