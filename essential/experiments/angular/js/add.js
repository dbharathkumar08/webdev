var helloApp = angular.module("helloApp", []);

helloApp.controller("CompanyCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.companies = [
	                    { 'name':'Intuit',
	                        'employees': 125000,
	                        'headoffice': 'Sac Diago,CA'},
	                    	{ 'name':'HP',
	                    	    'employees': 100000,
	                    	    'headoffice': 'Mountainview,CA'},
		                    	{ 'name':'Amzon.Inc',
		                    	    'employees': 115000,
		                    	    'headoffice': 'San Fransisco,CA'},
			                    	{ 'name':'Google',
			                    	    'employees': 150000,
			                    	    'headoffice': 'Mountainview,CA'},				                    	
    ];
	

    $scope.addRow = function(){		
        $scope.companies.push({ 'name':$scope.name, 'employees': $scope.employees, 'headoffice':$scope.headoffice });		
        $scope.name='';
        $scope.employees='';
        $scope.headoffice='';
    };
    $scope.removeRow = function (name) {
        var index = -1;
        var comArr = eval($scope.companies);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].name === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.companies.splice(index, 1);
    };


}]);