var app = angular.module("CourseApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'profileManager1/home.html'
        }).
        when('/about', {
            templateUrl: 'profileManager1/about.html'
        }).
        when('/contact', {
            templateUrl: 'profileManager1/contact.html'
        }).
      otherwise({
          redirectTo: '/home'
      });
  }]);
app.controller("loginController", function ($scope, loginService, $location) {
    $scope.currentUser = null;
    $scope.color = "btn btn-success";

    $scope.login = function () {

        loginService.login($scope.user, callback);

    }
    function callback() {
        $scope.currentUser = loginService.getCurrentUser();

        if ($scope.currentUser)
            $scope.color = "btn btn-success";
        else
            $scope.color = "btn btn-danger";
    }
    $scope.logout = function () {

        $scope.currentUser = null;
        $scope.user.username = null;
        $scope.user.password = null;
        var res = loginService.logout();
        $location.path('courseApp/home.html');
    }

});

app.factory("loginService", function ($http) {
    var currentUser = null;

    var login = function (user, callback) {

        $http.post('/mongod/login', user)
        .success(function (response) {
            currentUser = response;
            callback();
        });
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