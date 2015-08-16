/**
 * Created by aashish on 11/8/15.
 */
var app = angular.module('myApp',['ngMaterial','ngRoute']);


app.controller('sController',function($scope,$location,$http){
    $scope.heading="Login" ;
    //console.log($location.path());
    $pageId = $location.path().replace("/", "");
    if($pageId == 'register'){
        $scope.heading="Register";
    }
    else{
        $scope.heading="Login" ;
    }

    $scope.userShow = false;
    $scope.btnShow = false;



});


app.controller('loginController',function($scope,$http){

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



/* Register Controller */
app.controller('registerController',function($scope,$http){


    /* Clear Function */
    $scope.clear = function(){
        $scope.rc.username = "";
        $scope.rc.fname = "";
        $scope.rc.email = "";
        $scope.rc.password = "";


    };


    $scope.create = function () {
        console.log($scope.rc);
        $http.post('/signup',$scope.rc);

    };

});



app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl : 'login_form.html',
        controller: 'loginController'
    }).when('/register',{
        templateUrl:'register_form.html',
        controller:'registerController'
    });
});
