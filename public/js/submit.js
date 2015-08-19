/**
 * Created by aashish on 19/8/15.
 */

var app = angular.module('myApp',['ngMaterial']);

app.controller('sController',function($scope,$http,$window){
    console.log('App running');


    var isConnected = false;
    var pid = null;
    $scope.opt = ["Technology","Science","Daily Life","General","Other"];
    $scope.myvar="true";
    $scope.sc={ authname:'Author Name',auth:false};

    $scope.tog = function(){
        $scope.myvar = !$scope.myvar;
    }



    /**
     * To get User information if he/she is logged in
     */
    var check =function() {

        $http.get('/data').success(function (response) {
            if(response.data){
            // If connected through Facebook
            if (response.data.facebookConected == true) {
                if (response.data.gender == 'male') {
                    if (response.data.facebookphotourl != null) {
                        $scope.avatar = response.data.facebookphotourl;
                    }
                    else {
                        $scope.avatar = 'images/avatars/male/m1.png';
                    }
                }
                else if (response.data.gender == female) {
                    if (response.data.facebookphotourl != null) {
                        $scope.avatar = response.data.facebookphotourl;
                    }
                    else {
                        $scope.avatar = 'images/avatars/female/f3.png';
                    }
                }
                pid = response.data._id;
                isConnected = true;
            }
            //If connected through Google
            else if (response.data.googleConnected == true) {
                if (response.data.gender == 'male') {
                    if (response.data.googlephotourl != null) {
                        $scope.avatar = response.data.googlephotourl;
                    }
                    else {
                        $scope.avatar = 'images/avatars/male/m1.png';
                    }
                }
                else if (response.data.gender == female) {
                    if (response.data.googlephotourl != null) {
                        $scope.avatar = response.data.googlephotourl;
                    }
                    else {
                        $scope.avatar = 'images/avatars/female/f3.png';
                    }
                }
                isConnected = true;
                pid = response.data._id;
            }
            //If Locally connected
            else {

                pid = response.data._id;
            }
        }


        });

    };

    check();


    /**
     * Database entry
     */
    $scope.create = function(){
      var author,postUserId,image,media,Data = null;
        //console.log(isConnected,pid);
        if(isConnected){
            if($scope.sc.auth){
                author = $scope.sc.authname;
            }
            else{
                postUserId = pid;
            }

            Data={
                'postType':'Jugaad',
                'title':$scope.sc.title,
                'description':$scope.sc.description,
                'category':$scope.sc.category,
                'authorName':author,
                'postUserId':postUserId,
                'timestamp':new Date().getTime(),
                'image':image,
                'media':media
            };

             //console.log(Data);

            $http({
                method: 'POST',
                url: '/posts',
                data: Data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (data) {
                $window.location.href = '/';
                $window.location.href;
            });

        }
        else{

        }
    };


});





