var app = angular.module("DetailsApp", []);
app.controller("DetailsController", function ($scope, $http) {

    $scope.destinations = [];
    $scope.searchPlaces = function () {
        var name = $scope.searchByCity;

        $http.get("https://api.foursquare.com/v2/venues/explore?offset=0&limit=50&section=sights&near="+name+"&radius=40233.60&client_id=GSIEU2B3JTCYFZ35EKBEYDTI0ZVDWDHN31WY3RHKQ1O0UD5Q&client_secret=FNIT5VXIUSLDHGDLIHY3EIF3EAUWJIHQSMUCA5TDWXEA40MQ&v=20121215")
        .success(function (places) {
            var groups = places.response.groups;
            var destinations = groups[0].items;
            $scope.destinations = destinations;

        })
    }
    $scope.getDetails = function (dest) {
        var index = $scope.destinations.indexOf(dest);
        var name = dest.venue.name;
        var lname = name.toLowerCase();
        var removed = lname.replace("the ", "");
        var replaced = removed.replace(/ /g, "_");
        console.log(replaced);
        $http.get("https://www.googleapis.com/freebase/v1/text/en/" + replaced+ "?key=AIzaSyDoDjvyo5Yn_kvSJ8Z2F6dQpHe5xBvO2CQ")
        .success(function(res){
            $scope.details = res.result;
        })
       
    }
});