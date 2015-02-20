var app = angular.module("MyApp", [])

app.controller("button", function ($scope) {
    
    $scope.click = function () {
        alert("button clicked");
    }
});