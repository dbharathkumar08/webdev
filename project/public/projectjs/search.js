
app.controller("SearchController", function ($scope, $http, $routeParams) {
    
    //Search Tourist Destinations in A City
    var name = $routeParams.name;
    $scope.destinations = [];
    $(function () {
       
        console.log(name);
        $http.get("https://api.foursquare.com/v2/venues/explore?offset=0&limit=50&section=sights&near="+name+"&radius=40233.60&client_id=GSIEU2B3JTCYFZ35EKBEYDTI0ZVDWDHN31WY3RHKQ1O0UD5Q&client_secret=FNIT5VXIUSLDHGDLIHY3EIF3EAUWJIHQSMUCA5TDWXEA40MQ&v=20121215")
        .success(function (places) {
            var groups = places.response.groups;
            var destinations = groups[0].items;
            console.log(places);
            $scope.destinations = destinations;

        })
    })

  
    

});


