var app = angular.module("MyApp", []);

app.controller("MyCtrl", function ($scope) {
    $scope.books = [
   { title: "Harry Potter", price: 200 },
   { title: "Alchemist", price: 100 },
   { title: "Lord of the Rings", price: 300 },
   { title: "Meluha", price: 50 },
   { title: "Othello", price: 100 }
   ];

    $scope.filterFunction = function (element) {
        return element.title.match(/^Ma/) ? true : false;
    };

});