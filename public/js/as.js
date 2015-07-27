// add the module with global defaults for froala
var myApp = angular.module('myApp', ['textAngular','ui.bootstrap','ngRoute']).
config(function($provide){
 		$provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
			  taOptions.toolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
      ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
      ['html', 'insertImage','insertLink']
  ];
			return taOptions;
		}]);
});



myApp.controller('mainController', function($scope, $http) {
   console.log("Hello from Main Ctrl");

    $scope.myVar = true;
    $scope.var2 = true;
    
    /* Toggle for category */
    $scope.changed = function () {
     if ( $scope.jugaad.category == "oth" ) {
         $scope.myVar = !$scope.myVar;
     }
     };
    
    /* Toggle for author */
    $scope.tog2 = function () {
        $scope.var2 = !$scope.var2;
    };
    
    
    /* Clear Function */
    $scope.clear = function(){
        $scope.jugaad.title = null;
        $scope.jugaad.description = null;
        $scope.jugaad.category = null;
        $scope.jugaad.cat1 = null;
        $scope.jugaad.auth = null;
        
    };
    
    
    
    
	$scope.create = function () {
		console.log($scope.jugaad);
		$http.post("/serviceClients", $scope.jugaad )
		.success(function (response) { 
            $scope.clear();
			$scope.all(); 
		});
	};
    
    

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





//Routes
myApp.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl : 'jugaad_form.html',
    controller : 'mainController'
   });
  
});