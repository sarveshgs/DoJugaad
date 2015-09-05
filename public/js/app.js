/**
 * Created by aashish on 11/8/15.
 */
var app = angular.module('myApp',['ngMaterial']);

app.controller('AppCtrl',function($scope,$http,$mdToast, $animate,$rootScope){
    console.log('App running');


    if($rootScope.submitData){
        console.log($rootScope.submitData);
    }

    $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };


    var showCustomToast = function() {
        $mdToast.show({
            controller: 'ToastCtrl',
            templateUrl: 'toast.html',
            hideDelay: 6000,
            position: $scope.toastPosition
        });
    };


   var refresh = function() {
        $http.get('/posts').success(function(response) {
            console.log("I got the data I requested");
            $scope.posts = response;

        });
    };

    refresh();



    $http.get('/data').success(function(response){
       console.log(response);
        if(response.data){
       if(response.data.facebookConected==true){
          if(response.data.gender=='male'){
             if(response.data.facebookphotourl!=null){
                $scope.avatar=response.data.facebookphotourl;
             }
              else{
                $scope.avatar='images/avatars/male/m1.png';
             }
          }
           else if(response.data.gender==female){
              if(response.data.facebookphotourl!=null){
                  $scope.avatar=response.data.facebookphotourl;
              }
              else{
                  $scope.avatar='images/avatars/female/f3.png';
              }
          }
       }
        else if(response.data.googleConnected==true){
           if(response.data.gender=='male'){
               if(response.data.googlephotourl!=null){
                   $scope.avatar=response.data.googlephotourl;
               }
               else{
                   $scope.avatar='images/avatars/male/m1.png';
               }
           }
           else if(response.data.gender==female){
               if(response.data.googlephotourl!=null){
                   $scope.avatar=response.data.googlephotourl;
               }
               else{
                   $scope.avatar='images/avatars/female/f3.png';
               }
           }
       }

           else{
             $scope.avatar = response.data.avatar;
       }
        }

        else if(response.message){
            //showCustomToast();
            //response.message = null;
        }

    });

});

app.controller('ToastCtrl', function($scope, $mdToast) {
    $scope.closeToast = function() {
        $mdToast.hide();
    };
});