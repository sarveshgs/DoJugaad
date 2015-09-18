var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };


    $scope.cards = [{
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }, {
        text: 'Bla bla bla bla bla bla bla ',
        title: 'Bla'
    }];
    $scope.displayContent = true;
    $scope.toggleContent = function(showContent) {
        $scope.displayContent = showContent;
    };

}]);