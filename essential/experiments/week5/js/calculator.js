var app = angular.module('app', []);


app.controller('CalculatorController', function ($scope) {

    $scope.clear = function () {
        $scope.number = '';
        $scope.answer = '';
    }
    $scope.doSquare = function () {
        
        $scope.answer = $scope.number * $scope.number;
    }

    $scope.doCube = function () {
        $scope.answer = $scope.number * $scope.number * $scope.number;
    }
});