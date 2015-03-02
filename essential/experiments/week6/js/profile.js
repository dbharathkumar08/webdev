var app = angular.module("CourseApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'courseApp/home.html'
        }).
        when('/about', {
            templateUrl: 'courseApp/about.html'
        }).
        when('/contact', {
            templateUrl: 'courseApp/contact.html'
        }).
       when('/profile', {
           templateUrl: 'courseApp/profile.html'
       }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

app.controller("loginController", function ($scope, loginService,$location) {
    $scope.currentUser = null;
    $scope.color = "btn btn-success";
    $scope.clear = function () {
        $scope.username = '';
        
    }
    $scope.psclear = function(){
        $scope.password = '';
    }
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        var result = loginService.login(username, password);
        if (result == true) {
            $scope.currentUser = loginService.getCurrentUser();
            $scope.color = "btn btn-success";
        }
        else {
            $scope.color = "btn btn-danger";
        }
    }
    $scope.logout = function () {

        $scope.currentUser = null;
        $scope.username = null;
        $scope.password = null;
        var res = loginService.logout();
        $location.path('courseApp/home.html');
    }

});

app.factory("loginService", function () {
    var currentUser = null;

    var users = [
        { username: "isha", password: "isha" },
        { username: "admin", password: "admin" }
    ];

    var login = function (username, password) {
        for (var index in users) {
            if (users[index].username == username && users[index].password == password) {
                currentUser = users[index];
                return true;
            }
        }
        return false;
    }

    var getCurrentUser = function () {
        return currentUser;
    }

    var logout = function () {
        currentUser = null;
    }

    return {
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout
    }
});
