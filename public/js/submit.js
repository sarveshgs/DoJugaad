/**
 * Created by aashish on 19/8/15.
 */

var app = angular.module('myApp',['ngMaterial']);

app.controller('sController',function($scope,$http){
    console.log('App running');



    $http.get('/data').success(function(response){
        console.log(response);

    });
});

/**
 * Ask Jugaad form
 */
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


/**
 * Submit Idea form
 */
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


/**
 * Submit Product form
 */
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
