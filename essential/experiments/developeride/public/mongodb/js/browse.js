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
       when('/profile', {
           templateUrl: 'profileManager1/edit_profile.html',
           controller: 'ProfileController'
       }).
       when('/search', {
            templateUrl: 'profileManager1/search_profile.html',
            controller: 'BrowseController'
       }).
        otherwise({
            redirectTo: '/home'
        });
  }]);


app.factory("browseService", function ($http) {
    var users = null;

    var getallusers = function (callback) {
        $http.get('/mongod/search')
        .success(function (response) {
            users = response;
            callback(users);
            });
        
    }
    var returnuser = null;

    var searchuser = function (username,clbck) {
        
        var user = {
            username : username
        }
        $http.post('/mongod/browser', user)
        .success(function (response) {
           
            clbck(response);
        });
    }
   
    return {
        getallusers: getallusers,
        searchuser : searchuser
        //getallusers : getallusers
    }

});

app.controller("BrowseController", function ($scope, browseService) {
    $scope.searchuser = null;
    
    browseService.getallusers(callback);
    
    function callback(resp) {
        $scope.users = resp;
    }
    function clbck(resp) {
        console.log('inside callback1');
        console.log(resp);

        $scope.loc = resp.photo;
        $scope.firstName = resp.firstName;
        $scope.lastName = resp.lastName;
        $scope.email = resp.email;
        $scope.username = resp.username;
    }
    $scope.change = function (username) {
        console.log(username);
        $scope.searchuser = username;

        browseService.searchuser($scope.searchuser,clbck);
    }

});

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

    var updateCurrentUser = function (password, email, firstName, lastName, username, photo) {
        currentUser = {
            username: username,
            password: password,
            email: email,
            lastName: lastName,
            firstName: firstName,
            photo : photo
        }

        
        console.log(currentUser);
        $http.post('/mongod/update', currentUser)
        .success(function (response) {
            currentUser = response;
        });
    }
    var updatePhoto = function (photo) {
        currentUser[0].photo = photo;
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
        updatePhoto : updatePhoto
    }
});


app.controller("ProfileController", function ($scope, loginService, $routeParams) {
    var username = $routeParams.username;
    $scope.username = username;

    var currentUser = loginService.getCurrentUser();
    //console.log(currentUser);

    $scope.new_fn = currentUser[0].firstName;
    $scope.new_ln = currentUser[0].lastName;
    $scope.new_mail = currentUser[0].email;
    $scope.new_pwd = currentUser[0].password;
    $scope.re_pwd = currentUser[0].password;

    if (currentUser[0].photo == " ")
        $scope.loc ="../images/dp.jpg";
    else
        $scope.loc = currentUser[0].photo;

   
    $scope.mismatch = false;
    $scope.save = false;

    var handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];
        console.log("inside handle file select evt");
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.loc = "data:image/jpeg;base64," + btoa(binaryString);
                var photo = $scope.loc;
                loginService.updatePhoto($scope.loc);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("File picked");
        document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
    }
    else {
        alert('The File APIs are not fully supported in this browser.');
    }


    $scope.saveChanges = function () {
        var username = $scope.user.username;
        var password = $scope.new_pwd;
        var repassword = $scope.re_pwd;
        var email = $scope.new_mail;
        var firstName = $scope.new_fn;
        var lastName = $scope.new_ln;
        var photo = $scope.loc;
       


        //console.log("inside save: " + username);
        if (password != repassword) {
            $scope.mismatch = true;
            $scope.save = false;
        } else {
            $scope.mismatch = false;
            $scope.save = true;
            loginService.updateCurrentUser(password, email, firstName, lastName, username, photo);
        }
    }
});