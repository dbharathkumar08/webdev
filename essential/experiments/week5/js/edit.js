var app = angular.module("MyApp", []);

app.controller("Profile", function ($scope) {

    $scope.person = {
        name: "Isha Shah",

    };
});

app.controller("Editor", function ($scope) {

    $scope.name = $scope.person.name;
    $scope.save = function () {
        $scope.person.name = $scope.name;
    }

   
   
});



   
