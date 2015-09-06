/**
 * Created by aashish on 6/9/15.
 */

var app = angular.module('myApp',['ngMaterial']);

app.controller('aController',function($scope,$http){
    console.log('App running');


    var isConnected = false;
    var pid = null;

    $scope.myvar="true";


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

                    $scope.avatar = response.data.avatar;
                }
            }


        });

    };

    check();



});

