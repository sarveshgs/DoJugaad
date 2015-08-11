/**
 * Created by aashish on 11/8/15.
 */
var app = angular.module('myApp',['ngMaterial','ngRoute','textAngular']);

app.config(function($provide){
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
               // $scope.all();
            });
    };



    $scope.renderData = function (response) {
        $scope.posts = response;
    };


    $scope.all = function(){
         $http.get("/posts").success($scope.renderData);
    }

   // $scope.all();

});

app.config(function($routeProvider){
   $routeProvider.when('/',{
       templateUrl : 'jugaad_form.html',
       controller: 'jugaadController'
   });
});
