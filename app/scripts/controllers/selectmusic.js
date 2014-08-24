'use strict';

/**
 * @ngdoc function
 * @name yukiApp.controller:SelectmusicCtrl
 * @description
 * # SelectmusicCtrl
 * Controller of the yukiApp
 */
angular.module('yukiApp')
  .controller('SelectmusicCtrl', function ($scope,$state,Music,MusicPlugin) {

    console.log('Select Music');
    MusicPlugin.openWindow(function(data){
      $scope.closeMenu();
      Music.put(data,function(){
        console.log('Put Music',data);              
        $state.go('index.items',{},{reflesh:true});
      });
    },function(data){
      alert('fail');
      $scope.closeMenu();
      $state.go('index.items',{},{reflesh:true});
    });

  });
