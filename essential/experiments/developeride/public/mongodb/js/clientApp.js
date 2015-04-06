var app = angular.module("DeveloperApp", []);

app.controller("DeveloperController", function ($scope, $http) {

    $http.get('/mongod/developer')
   .success(function (response) {
       $scope.developers = response;
   });

    $scope.remove = function (id) {
        $http.delete('/mongod/developer/' + id)
        .success(function (response) {
            $scope.developers = response;
        });
    };

    $scope.add = function (developer) {

        $http.post('/mongod/developer', developer)
        .success(function (response) {
            $scope.developers = response;
        });
    };

    $scope.selectedIndex = null;

    $scope.select = function (id) {
        $scope.selectedIndex = id;

        $http.get('/mongod/developer/' + id)
        .success(function (response) {
            $scope.developer = response;
        });

    };

    $scope.update = function (developer) {
        $http.put('/mongod/developer/' + $scope.selectedIndex, developer)
        .success(function (response) {
            $scope.developers = response;
        });
    };
});