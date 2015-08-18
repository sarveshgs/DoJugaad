/**
 * Created by aashish on 11/8/15.
 */
var app = angular.module('myApp',['ngMaterial']);

app.controller('AppCtrl',function($scope,$http){
    console.log('App running');

    $scope.userShow = false;
    $scope.loginbtnShow = true;
    $scope.logoutbtnShow = false;

   var refresh = function() {
        $http.get('/posts').success(function(response) {
            console.log("I got the data I requested");
            $scope.posts = response;

        });
    };

    refresh();



    $http.get('/data').success(function(response){
       console.log(response);

    });
});