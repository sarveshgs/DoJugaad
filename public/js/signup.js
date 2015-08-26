/**
 * Created by aashish on 25/8/15.
 */
/**
 * Created by aashish on 11/8/15.
 */
var app = angular.module('myApp',['ngMaterial']);


app.controller('lController',function($scope,$location,$http,$window){
    $scope.imagePath = 'images/vb.png';

    $scope.lc = {gender:'male'};

    $scope.create = function(){
        $http.post('/signup',$scope.lc).success(function(response){
            $window.location.href = '/login';
            $window.location.href;
        });
    };
});



