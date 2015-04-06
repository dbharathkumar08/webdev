var app = angular.module("PlacesApp", []);
app.controller("ListController", function ($scope, $http) {

    $scope.destinations = [];
    $scope.searchPlaces = function () {
        var name = $scope.searchByCity;

        $http.get("https://api.foursquare.com/v2/venues/explore?offset=0&limit=50&section=sights&near="+name+"&radius=40233.60&client_id=GSIEU2B3JTCYFZ35EKBEYDTI0ZVDWDHN31WY3RHKQ1O0UD5Q&client_secret=FNIT5VXIUSLDHGDLIHY3EIF3EAUWJIHQSMUCA5TDWXEA40MQ&v=20121215")
        .success(function (places) {
            console.log("all");
            console.log(places);
            var groups = places.response.groups;
            console.log("groups");
            console.log(groups);
            var destinations = groups[0].items;
            console.log("destinations");
            console.log(destinations);
            $scope.destinations = destinations;

        })
    }
});