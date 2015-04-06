var app = angular.module("TravelApp", []);
app.controller("infocontroller", function ($scope, $http) {
   
    $scope.destinations = [];
    $scope.searchPlaces = function () {
        var name = $scope.searchByCity;
        
        $http.get("https://www.googleapis.com/freebase/v1/topic/en/" + name + "/?props=&lang=en&filter=%2Ftravel%2Ftravel_destination%2Ftourist_attractions&limit=30&key=AIzaSyDoDjvyo5Yn_kvSJ8Z2F6dQpHe5xBvO2CQ")
        .success(function (places) {
            console.log("all");
            console.log(places);
            var travel = "/travel/travel_destination/tourist_attractions";
            var destinations = places.property[travel].values;
            console.log("after");
            console.log(destinations);
            $scope.destinations = destinations;

        })
    }
});