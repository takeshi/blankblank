'use strict';

/**
 * @ngdoc function
 * @name yukiApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the yukiApp
 */
angular.module('yukiApp')
  .controller('ItemsCtrl', function ($scope,$state,Music,$timeout) {
    $scope.initialized = false;
    $timeout(function(){
      console.log('Musics#selectAll');
      Music.selectAll(function(data){
        console.log('Musics#selectAll',data);
        $scope.items = data;
        $scope.initialized = true;
        $scope.$apply();
      })
    },500);

    $scope.toItem = function(item){
      $state.go('index.item',{
        persistentID:item.persistentID
      });
    };

  });
