'use strict';

/**
 * @ngdoc overview
 * @name yukiApp
 * @description
 * # yukiApp
 *
 * Main module of the application.
 */
angular
  .module('yukiApp', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/items');

  $stateProvider
    .state('index', {
      url: '',
      abstract:true,
      templateUrl: 'views/index2.html',
      controller:'MainCtrl'
    })

    .state('index.top', {
      url: '/top',
      templateUrl: 'views/top.html'
    })
    
    .state('index.items',{
      url:'/items',
      templateUrl:'views/items.html',
      controller:'ItemsCtrl'
    })

    .state('index.item',{
      url:'/items/:persistentID',
      templateUrl:'views/item.html',
      controller:'ItemCtrl'
    })

    .state('index.edit',{
      url:'/items/:persistentID/edit',
      templateUrl:'views/edit.html',
      controller:'EditCtrl'
    })

    .state('index.selectMusic',{
      url:'/selectMusic',
      controller:'SelectmusicCtrl'
    })


    ;

}).run(function($location){
  // $location.path('/items');  
});

function isMockMode(){
    return typeof Cordova == 'undefined';
}

function startAngular(){
    var domElement = document.getElementById('myApp');
    // console.log(domElement);
    angular.bootstrap(domElement, ['yukiApp']);
}

if(isMockMode()){
  $(function(){
    startAngular();
  });
}else{
  document.addEventListener("deviceready", function(){
    startAngular();
  }, false);  
}
