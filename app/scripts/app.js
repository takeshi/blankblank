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

  $urlRouterProvider.otherwise('/top');

  $stateProvider
    .state('index', {
      url: '',
      templateUrl: 'views/index2.html',
      controller:'MainCtrl'
    })

    .state('index.top', {
      url: '/top',
      templateUrl: 'views/top.html'
    })
    ;
});