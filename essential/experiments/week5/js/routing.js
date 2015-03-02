//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
sampleApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'homeController'
        }).
        when('/about', {
            templateUrl: 'templates/about.html',
            controller: 'aboutController'
        }).
        when('/profile', {
            templateUrl: 'templates/profile.html',
            controller: 'profileController'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);


sampleApp.controller('homeController', function ($scope) {

    $scope.message = 'This is Home screen';

});


sampleApp.controller('aboutController', function ($scope) {

    $scope.message = 'In this page you can find information about us';

});

sampleApp.controller('profileController', function ($scope) {

    $scope.message = 'In this page you can surf through your profile';

});