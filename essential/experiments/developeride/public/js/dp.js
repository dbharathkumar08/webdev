var app = angular.module("CourseApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'profileManager/home.html'
        }).
        when('/about', {
            templateUrl: 'profileManager/about.html'
        }).
        when('/contact', {
            templateUrl: 'profileManager/contact.html'
        }).
       when('/profile/:username', {
           templateUrl: 'profileManager/dp.html',
           controller: 'ProfileController'
       }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

app.controller("loginController", function ($scope, loginService, $location) {
    $scope.currentUser = null;
    $scope.color = "btn btn-success";
    $scope.clear = function () {
    $scope.username = '';

    }
    $scope.psclear = function () {
        $scope.password = '';
    }
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
        $scope.username = null;
        $scope.password = null;
        var res = loginService.logout();
        $location.path('courseApp/home.html');
    }

});

app.factory("loginService", function ($http) {
    var currentUser = null;

   var login = function (user, callback) {
        $http.post('/login', user)
        .success(function (response) {
            currentUser = response;
            callback();
        });
   }
   var updatePhoto = function (photo) {
       currentUser.photo = photo;
   }

    var updateCurrentUser = function (password, email, firstName, lastName) {
        currentUser.password = password;
        currentUser.email = email;
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;

        $http.post('/update', currentUser)
        .success(function (response) {
            currentUser = response;
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
        logout: logout,
        updateCurrentUser: updateCurrentUser,
        updatePhoto: updatePhoto
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

    if (currentUser.photo == "")
        $scope.loc = "../../images/dp.jpg";
    else
        $scope.loc = currentUser.photo;

    var handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.loc = "data:image/jpeg;base64," + btoa(binaryString);
                loginService.updatePhoto($scope.loc);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

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