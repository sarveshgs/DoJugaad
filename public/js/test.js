/**
 * Created by aashish on 5/9/15.
 */

//var app = angular.module('app',['ui.bootstrap']);
var app = angular.module('myApp',['oitozero.ngSweetAlert']);

app.controller("signController", function($scope,SweetAlert,$window){

    console.log('App started');


$scope.create = function () {
  console.log($scope.sc);
    SweetAlert.swal({
            title: "Info",
            text: "We appreciate and value your post, but it will be more useful if we identify you.",
            confirmButtonColor: "#DD6B55",confirmButtonText: "Login",
            closeOnConfirm: true
          },
        function(isConfirm){

                //SweetAlert.swal("Deleted!", "Your imaginary file has been deleted.", "success");
               $window.location.href = '/login';
               $window.location.href;

        });
}

});






