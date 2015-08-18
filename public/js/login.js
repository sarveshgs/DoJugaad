/**
 * Created by aashish on 11/8/15.
 */
var app = angular.module('myApp',['ngMaterial']);


app.controller('lController',function($scope,$location,$http){
    $scope.imagePath = 'images/vb.png';

    //console.log($location.path());
    //$pageId = $location.path().replace("/", "");
    $scope.create = function(){
        console.log($scope.lc);
        $http.post('/login',$scope.lc);
    };


});



