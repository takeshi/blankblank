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
      url:'/items/:itemId',
      templateUrl:'views/item.html',
      controller:'ItemCtrl'
    })
    ;

}).run(function($location){
  // $location.path('/items');  
});