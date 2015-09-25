/**
 * This will be the common JS File for all the pages having different controllers
 *
 */

var app = angular.module('myApp',['oitozero.ngSweetAlert','duScroll']) .value('duScrollDuration', 2000)
    .value('duScrollOffset', 30);

/**
 * Header Scroll Directive
 */
app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {

        angular.element($window).bind("scroll", function() {
            if(this.pageYOffset >= 250){
                scope.boolChangeClass = true;

            }
            else if (this.pageYOffset >= 500) {


            } else {
                scope.boolChangeClass = false;
            }
            scope.$apply();
        });
    };
});



/**
 * Common Controller
 */
app.controller('common',function($scope,$http,$document,$rootScope) {
    console.log('App running');
    $rootScope.isConnected = false;
    $rootScope.pid = null;



        // Scroll to Top Function
    $scope.gotoTop = function() {
        $document.scrollTopAnimated(0, 500).then(function() {
            console && console.log('You just scrolled to the top!');
        });
    };


    // Function to check if User is Logged In
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
                    $rootScope.pid = response.data._id;
                    $rootScope.isConnected = true;
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
                    $rootScope.isConnected = true;
                    $rootScope.pid = response.data._id;
                }
                //If Locally connected
                else {
                    $scope.avatar = response.data.avatar;
                    $rootScope.isConnected = true;
                    $rootScope.pid = response.data._id;
                }
            }
        });
    };

    check();


});




/**
 * About Page Controller
 */
app.controller('aController',function($scope){
    $scope.title="About";
});



/**
 * FAQ Page Controller
 */
app.controller('fController',function($scope) {
    $scope.title="FAQ";
});



/**
 * How It Works Page Controller
 */
app.controller('hiwController', function ($scope) {
    $scope.title="How It Works";
    $scope.class1 = "active";
    $scope.class2 = "disabled";
    $scope.class3 = "disabled";
    $scope.class4 = "disabled";

    $scope.status1 = "current";
    $scope.cur1 = "cur";
    $scope.cur2="def";
    $scope.cur3="def";
    $scope.cur4="def";

     $scope.tog = false;
    $scope.tog2 = true;
    $scope.tog3 = true;
    $scope.tog4 = true;

    $scope.tog1 = function () {
        $scope.class1 = "active";
        $scope.class2 = "disabled";
        $scope.class3 = "disabled";
        $scope.class4 = "disabled";
        $scope.status1 = "current";
        $scope.status2 = "";
        $scope.status3 = "";
        $scope.status4 = "";
        $scope.cur1 = "cur";
        $scope.cur2="def";
        $scope.cur3="def";
        $scope.cur4="def";
    };

    $scope.tog2 = function () {
        $scope.class1 = "disabled";
        $scope.class2 = "active";
        $scope.class3 = "disabled";
        $scope.class4 = "disabled";
        $scope.status1 = "";
        $scope.status2 = "current";
        $scope.status3 = "";
        $scope.status4 = "";
        $scope.cur1 = "def";
        $scope.cur2="cur";
        $scope.cur3="def";
        $scope.cur4="def";

    };

    $scope.tog3 = function () {
        $scope.class1 = "disabled";
        $scope.class2 = "disabled";
        $scope.class3 = "active";
        $scope.class4 = "disabled";
        $scope.status1 = "";
        $scope.status2 = "";
        $scope.status3 = "current";
        $scope.status4 = "";
        $scope.cur1 = "def";
        $scope.cur2="def";
        $scope.cur3="cur";
        $scope.cur4="def";
    };

    $scope.tog4 = function () {
        $scope.class1 = "disabled";
        $scope.class2 = "disabled";
        $scope.class3 = "disabled";
        $scope.class4 = "active";
        $scope.status1 = "";
        $scope.status2 = "";
        $scope.status3 = "";
        $scope.status4 = "current";
        $scope.cur1 = "def";
        $scope.cur2="def";
        $scope.cur3="def";
        $scope.cur4="cur";
    };


});

/**
 * How We Are Page Controller
 */
app.controller('hwaController', function ($scope) {
    $scope.title="How We Are";
});

/**
 * Login Page Controller
 */
app.controller('loginController', function ($scope,$http,SweetAlert) {
    //$scope.title="How We Are";

    setTimeout(function() {
        $http.get('/t').success(function (response) {
            //console.log(response);
            if(response == 'y'){
                SweetAlert.swal({   title: "Successfully Registered",   text: "Login to continue",  type: "success" });
            }
        });
    }, 1500);


});



/**
 * Signup Page Controller
 */
app.controller('signController', function ($scope,$http,$window) {


    console.log('Running');
    $scope.create = function() {

        var Data = {
            'email': $scope.sc.email,
            'password': $scope.sc.password,
            'name': $scope.sc.name,
            'gender': $scope.sc.gender
        };


        $http({
            method: 'POST',
            url: '/signup',
            data: Data,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function (data) {
            if(data == 'success'){
                $window.location.href = '/success';
                $window.location.href;
            }
            else{
                $window.location.href = '/login';
                $window.location.href;
            }

        });


    };
});




app.controller('sub',function($scope){
    $scope.title="Submit";
});



/**
 * Submit Idea Controller
 */
app.controller('iController', function ($scope,$http,$rootScope,$window,LxDialogService) {
    var valid = false;
    var defaultForm = {
        title:"",
        description:"",
        category:"",
        problem:""
    }
    $scope.opt = ["Technology","Science","Daily Life","General","Other"];

    console.log($rootScope.isConnected);

    var validate = function(){
        if($scope.idea.title!=null && $scope.idea.description!=null && $scope.idea.category!=null){
            valid = true;
        }
    };

   $scope.create = function(){
       var author,postUserId,image,media,Data = null;
       Data={
           'postType':'Jugaad',
           'title':$scope.idea.title,
           'description':$scope.idea.description,
           'category':$scope.idea.category,
           'problem':$scope.idea.problem,
           'postUserId':postUserId,
           'timestamp':new Date().getTime(),
           'image':image,
           'media':media
       };

       //console.log(Data);
       validate();

       if(valid){
       if(!$rootScope.isConnected){
           $http.post('/temp',Data).success(function(response){
               console.log(response);
               SweetAlert.swal({
                       title: "Info",
                       text: "We appreciate and value your post, but it will be more useful if we identify you.",
                       confirmButtonColor: "#DD6B55",confirmButtonText: "Login",
                       closeOnConfirm: true
                   },
                   function(isConfirm){
                       $window.location.href = '/login';
                       $window.location.href;

                   });
           }) ;
       }else{
           Data.postUserId = $rootScope.pid;
           $http({
               method: 'POST',
               url: '/posts',
               data: Data,
               headers: {
                   'Content-Type': 'application/json; charset=utf-8'
               }
           }).success(function (data) {
               $window.location.href = '/success';
               $window.location.href;
           });
       }
       }

   }

   $scope.clear = function(){
          $scope.idea = defaultForm;
   }

});




/**
 * Submit Jugaad Controller
 */
app.controller('jController', function ($scope,$http,$rootScope,$window,SweetAlert) {
    var valid = false;
    var defaultForm = {
        title:"",
        description:"",
        category:"",
        authname:""
    }
    $scope.opt = ["Technology","Science","Daily Life","General","Other"];


    console.log($rootScope.isConnected);

    var validate = function(){
        if($scope.jugaad.title!=null && $scope.jugaad.description!=null && $scope.jugaad.category!=null){
            valid = true;
        }
    };



    $scope.create = function(){
        var author,postUserId,image,media,Data = null;
        Data={
            'postType':'Jugaad',
            'title':$scope.jugaad.title,
            'description':$scope.jugaad.description,
            'category':$scope.jugaad.category,
            'author':$scope.jugaad.authname,
            'postUserId':postUserId,
            'timestamp':new Date().getTime(),
            'image':image,
            'media':media
        };


        //console.log(Data);
        validate();

        if(valid){

            if(!$rootScope.isConnected){
            $http.post('/temp',Data).success(function(response){
                console.log(response);
                SweetAlert.swal({
                        title: "Info",
                        text: "We appreciate and value your post, but it will be more useful if we identify you.",
                        confirmButtonColor: "#DD6B55",confirmButtonText: "Login",
                        closeOnConfirm: true
                    },
                    function(isConfirm){
                        $window.location.href = '/login';
                        $window.location.href;

                    });
            });
        }else{
            Data.postUserId = $rootScope.pid;
            $http({
                method: 'POST',
                url: '/posts',
                data: Data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (data) {
                $window.location.href = '/success';
                $window.location.href;
            });
        }

        }

    };

    $scope.clear = function(){
        $scope.jugaad = defaultForm;
    };

});




/**
 * Submit Product Controller
 */
app.controller('pController', function ($scope,$http,$rootScope,$window) {
    var valid = false;
    var defaultForm = {
        name:"",
        description:"",
        price:"",
        problem:""
    }
    $scope.opt = ["Technology","Science","Daily Life","General","Other"];

    console.log($rootScope.isConnected);




    var validate = function(){

        if($scope.product.name!=null && $scope.product.description!=null && $scope.product.category!=null){
          valid = true;
        }
    };


    $scope.create = function(){
        var author,postUserId,image,media,Data = null;
        Data={
            'postType':'Jugaad',
            'title':$scope.product.name,
            'description':$scope.product.description,
            'category':$scope.product.category,
            'problem':$scope.product.problem,
            'price':$scope.product.price,
            'postUserId':postUserId,
            'timestamp':new Date().getTime(),
            'image':image,
            'media':media
        };

        validate();

        if(valid){

        //console.log(Data);
        if(!$rootScope.isConnected){

            $http.post('/temp',Data).success(function(response){
                console.log(response);
                SweetAlert.swal({
                        title: "Info",
                        text: "We appreciate and value your post, but it will be more useful if we identify you.",
                        confirmButtonColor: "#DD6B55",confirmButtonText: "Login",
                        closeOnConfirm: true
                    },
                    function(isConfirm){
                        $window.location.href = '/login';
                        $window.location.href;

                    });
            }) ;
        }else{
            Data.postUserId = $rootScope.pid;
            $http({
                method: 'POST',
                url: '/posts',
                data: Data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (data) {
                $window.location.href = '/success';
                $window.location.href;
            });
        }
        }


    }

    $scope.clear = function(){
        $scope.product = defaultForm;
    }

});


app.controller('hController', function($scope,$http){

   $scope.links = [
        {
            "text": "About",
            "link": "/about"
        },
        {
            "text": "How It Works",
            "link": "/hiw"
        },
        {
            "text": "FAQ",
            "link": "/faq"
        }
    ];
});
