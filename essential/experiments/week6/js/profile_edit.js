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
           templateUrl: 'courseApp/profile_edit.html',
           controller:'ProfileController'
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
        { username: "isha", password: "isha", email: "shah.is@husky.neu.edu", firstName: "Isha", lastName: "Shah" },
        { username: "admin", password: "admin", email: "admin@gmail.com", firstName: "Admin", lastName: "Admin" }
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
    var updateCurrentUser = function (password, email, firstName, lastName) {
        currentUser.password = password;
        currentUser.email = email;
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
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
        logout: logout,
        updateCurrentUser: updateCurrentUser
    }
});

app.controller("ProfileController", function ($scope, loginService, $routeParams) {
    var username = $routeParams.username;
    $scope.username = username;
    var currentUser = loginService.getCurrentUser();

    $scope.new_fn = currentUser.firstName;
    $scope.new_ln = currentUser.lastName;
    $scope.new_mail = currentUser.email;
    $scope.new_pwd = currentUser.password;
    $scope.re_pwd = currentUser.password;

    $scope.mismatch = false;
    $scope.save = false;

    $scope.saveChanges = function () {
        var password = $scope.new_pwd;
        var repassword = $scope.re_pwd;
        var email = $scope.new_mail;
        var firstName = $scope.new_fn;
        var lastName = $scope.new_ln;

        if (password != repassword) {
            $scope.mismatch = true;
            $scope.save = false;
        } else {
            $scope.mismatch = false;
            $scope.save = true;
            loginService.updateCurrentUser(password, email, firstName, lastName);
        }
    }
});