'use strict';

/**
 * @ngdoc function
 * @name yukiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yukiApp
 */
angular.module('yukiApp')
  .controller('MainCtrl', function ($scope,MusicPlugin,Music,$state) {
    var MainView = $scope.MainView = {};

    MainView.menus = [
      {
        title:'Select Music',
        action:function(){
          $state.go('index.selectMusic');
        }
      }
    ];

    MainView.showMenu = false;

    $scope.openMenu = function(){
      MainView.showMenu = true;
    };

    $scope.closeMenu = function(){
      MainView.showMenu = false;
    };

    $scope.selectMusic = function(){
      $state.go('index.selectMusic');
    };

  });
