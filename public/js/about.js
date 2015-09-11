/**
 * Created by aashish on 6/9/15.
 */

var app = angular.module('myApp',['ngMaterial','duScroll','ngMdIcons']) .value('duScrollDuration', 2000)
    .value('duScrollOffset', 30);

app.controller('aController',function($scope,$http,$document,$mdSidenav){
    console.log('App running');


    var isConnected = false;
    var pid = null;
    $scope.toggleSidenav = toggleSidenav;

    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

   $scope.title="About";

    $scope.gotoTop = function() {

        $document.scrollTopAnimated(0, 500).then(function() {
            console && console.log('You just scrolled to the top!');
        });
    };


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

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {

        angular.element($window).bind("scroll", function() {
            if(this.pageYOffset >= 250){
                scope.boolChangeClass = true;
                console.log("ToolBar");
            }
            else if (this.pageYOffset >= 500) {

                console.log("FAB Visible");
            } else {
                scope.boolChangeClass = false;
            }
            scope.$apply();
        });
    };
});

app.config(function($mdThemingProvider) {

    var myColor = $mdThemingProvider.extendPalette('blue-grey', {
        '500': '455A64'
    });

    $mdThemingProvider.definePalette('myBlue', myColor);

    $mdThemingProvider.theme('default')
        .primaryPalette('myBlue')
        .accentPalette('pink');

    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});


