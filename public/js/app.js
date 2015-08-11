/**
 * Created by aashish on 11/8/15.
 */
var app = angular.module('myApp',['ngMaterial']);

app.controller('AppCtrl',function($scope,$http){
    console.log('App running');


   // $scope.posts = [{'title':'Title 1','description':'This is the demo description 1'},{'title':'Title 2','description':'This is the demo description 2'},{'title':'Title 3','description':'This is the demo description 3'}];


    var refresh = function() {
        $http.get('/posts').success(function(response) {
            console.log("I got the data I requested");
            $scope.posts = response;

        });
    };

    refresh();
});