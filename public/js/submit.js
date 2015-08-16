/**
 * Created by aashish on 11/8/15.
 */
var app = angular.module('myApp',['ngMaterial','ngRoute']);


app.controller('sController',function($scope,$location,$http){

    $http.get('/page/submit').success(function(response){
        console.log(response);
    });


    $scope.heading="Ask Jugaad" ;
    //console.log($location.path());
    $pageId = $location.path().replace("/", "");
    if($pageId == 'idea'){
        $scope.heading="Submit Idea";
    }
    else if($pageId == 'product'){
        $scope.heading="Submit Product";
    }

    $scope.userShow = false;
    $scope.btnShow = true;
});


app.controller('jugaadController',function($scope,$http){

  $scope.opt = ["Technology","Science","Daily Life","General","Other"];
  $scope.myvar="true";
  $scope.jc={ authname:'Author Name'};

  $scope.tog = function(){
      $scope.myvar = !$scope.myvar;
  }


    /* Clear Function */
    $scope.clear = function(){
        $scope.jc.title = null;
        $scope.jc.description = null;
        $scope.jc.category = null;
        $scope.jc.auth = null;
        $scope.jc.authname = null;
    };

    /* Data entry function */
    $scope.create = function () {
        console.log($scope.jc);
        $http.post("/posts", $scope.jc )
            .success(function (response) {
                $scope.clear();

            });
    };


});

/* Idea Submition Controller */
app.controller('ideaController',function($scope,$http){
    $scope.opt = ["Technology","Science","Daily Life","General","Other"];
    $scope.myvar="true";

    $scope.tog = function(){
        $scope.myvar = !$scope.myvar;
    }


    /* Clear Function */
    $scope.clear = function(){
        $scope.ic.title = null;
        $scope.ic.description = null;
        $scope.ic.category = null;
        $scope.ic.problem = null;

    };

    /* Data entry function */
    $scope.create = function () {
        console.log($scope.ic);
        $http.post("/posts", $scope.ic )
            .success(function (response) {
                $scope.clear();

            });
    };


});

/* Product Submission Controller */
app.controller('productController',function($scope,$http){
    $scope.opt = ["Technology","Science","Daily Life","General","Other"];
    $scope.myvar="true";


    $scope.tog = function(){
        $scope.myvar = !$scope.myvar;
    }


    /* Clear Function */
    $scope.clear = function(){
        $scope.pc.name = null;
        $scope.pc.description = null;
        $scope.pc.category = null;
        $scope.pc.price = null;
        $scope.pc.problem = null;
    };

    /* Data entry function */
    $scope.create = function () {
        console.log($scope.pc);
        $http.post("/posts", $scope.pc )
            .success(function (response) {
                $scope.clear();

            });
    };

});



app.config(function($routeProvider){
   $routeProvider.when('/',{
       templateUrl : 'jugaad_form.html',
       controller: 'jugaadController',
       data: {
           requireLogin: true
       }
   }).when('/idea',{
       templateUrl:'idea_form.html',
       controller: 'ideaController',
       data: {
           requireLogin: true
       }
   }).when('/product',{
       templateUrl:'product_form.html',
       controller:'productController',
       data: {
           requireLogin: true
       }
   });
});
