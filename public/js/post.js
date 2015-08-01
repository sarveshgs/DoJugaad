var app = angular.module("myApp", ['ui.bootstrap','ngRoute']);

    app.config(function($routeProvider) {
            $routeProvider.
                    when('/jugaad/:param', {
                        templateUrl: 'post-detail.html',
                        controller: 'RouteController'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
        });


/*app.config(function($routeProvider){
  $routeProvider
  .when('/jugaad/:param',{
    templateUrl : 'post-detail.html',
    controller : 'RouteController'
   });
  
});*/

    app.controller("RouteController", function($scope, $routeParams) {
        $scope.param = $routeParams.param;
    });