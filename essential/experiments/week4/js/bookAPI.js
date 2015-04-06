var app = angular.module("booksApp", []);

    app.controller("infocontroller", function ($scope, $http) {

        $scope.favBooks = [];

        $scope.searchBooks = function(){    
            var name = $scope.searchByTitle;
            $http.get("https://www.googleapis.com/books/v1/volumes?q=" + name + "&key=AIzaSyDoDjvyo5Yn_kvSJ8Z2F6dQpHe5xBvO2CQ")
            .success(function (books) {
                $scope.books = books.items;
                var book = books.items;
                
                })
        }

        $scope.removeBooks = function (book) {
            var index = $scope.books.indexOf(book);
            $scope.books.splice(index, 1);
        }

        $scope.addToFav = function (book) {
            $scope.favBooks.push(book);
        }

        $scope.removeFav = function (book) {
            var index = $scope.favBooks.indexOf(book);
            $scope.favBooks.splice(index, 1);
        }

      
        });
    
