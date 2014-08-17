'use strict';

/**
 * @ngdoc function
 * @name yukiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yukiApp
 */
angular.module('yukiApp')
  .controller('MainCtrl', function ($scope) {
    var MainView = $scope.MainView = {};

    MainView.menus = [
      {
        title:'Select Music',
        action:function(){
          console.log('select');
          $scope.closeMenu();
        }
      }
    ];

    MainView.showMenu = false;

    $scope.openMenu = function(){
      MainView.showMenu = true;
      // alert('open menu');
      // Cordova.exec(
      //   function(ret){
      //     console.log(ret);
      //   }, 
      //   function(error){
      //     console.log(error);
      //   }, 
      //   'MusicPlugin', 
      //   'openWindow',
      //   []
      // );

    };

    $scope.closeMenu = function(){
      MainView.showMenu = false;
    };

  });
