'use strict';

/**
 * @ngdoc function
 * @name yukiApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the yukiApp
 */
angular.module('yukiApp')
  .controller('ItemsCtrl', function ($scope,$state) {
    $scope.items = [
    ];
    for (var i = 0;i<20;i++){
      $scope.items.push({
        "albumTitle":"Fragrance",
        "title":"A Little < Epilogue >" + (i + 1)
      });
    }

    $scope.toItem = function(item){
      $state.go('index.item',{
        itemId:item.name
      });
    };

  });
