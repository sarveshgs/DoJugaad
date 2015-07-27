var myApp = angular.module('myApp', ['ui.bootstrap']);


myApp.controller('ServiceController', function($scope, $http) {
   console.log("Hello from Main Ctrl");

   

	$scope.renderPost = function (response) {
		$scope.serviceClients = response;
	};

  
    
    
   $scope.all = function() 
                   {
						
						$http.get("/serviceClients")
						.success($scope.renderPost);
					}
   $scope.all();

});
