'use strict';

/**
 * @ngdoc function
 * @name yukiApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the yukiApp
 */
angular.module('yukiApp')
  .controller('ItemCtrl', function ($scope,$stateParams,Music) {
    var itemId = $stateParams.itemId;

    Music.findById(itemId,function(data){
      $scope.item = data;

      $scope.item.splites = [];
      for(var i = 0;i<10;i++){
        $scope.item.splites.push({
          label:i
        });
      }
    });

  });
