'use strict';

/**
 * @ngdoc function
 * @name yukiApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the yukiApp
 */
angular.module('yukiApp')
  .controller('ItemCtrl', function ($scope,$stateParams,Music,$state,MusicPlugin,Tokenizer,$timeout,$log) {

$scope.MainView.title = 'Play';


var persistentID = $stateParams.persistentID;

$scope.initialized = false;
$scope.showAnswer = false;

Music.find(persistentID,function(data){
  $scope.$apply(function(){
    init(data);
  });
});

function init(data){
  $scope.item = data;
  if($scope.item.splites == null){
    $scope.item.splites = [];
  }
  setSplite(0);
  $scope.initialized = true;
}

function compare(){

  var splite = $scope.splite;
  var results = Tokenizer.compare(splite.answer||'',splite.input||'');
  $log.info(results);
  var previousClear = splite.clear || false;
  splite.clear = true;
  angular.forEach(results,function(result){
    splite.clear &= result.compare;
    if(result.partial){
       splite.clear = false;
    }
  });
  $log.info('clear',splite.clear );
  splite.compare = results;
  if(previousClear == false && splite.clear){
    Music.clear();
  }

}

$scope.selectSplite = function(splite,index){
  setSplite(index);
  $scope.playWithTime($scope.splite);
}
$scope.keyEvent = function(event){
  if(event.keyCode == 13){
    var splite = $scope.splite;
    $scope.playWithTime(splite);
    event.preventDefault();      
    return false;
  }

  if($scope.splite.clear){
    if(event.keyCode == 32){
      $scope.nextItem()
    }
    event.preventDefault();      
    return false;    
  }

  $timeout(function(){
    compare();
  },100);  
}

function setSplite(index){
  if(index >= $scope.item.splites.length){
    $scope.splite = null;
    $scope.spliteIndex = -1; 
    return;
  }
  $scope.splite = $scope.item.splites[index];
  $scope.spliteIndex = index; 
}

$scope.playWithTime = function(splite){
  MusicPlugin.playWithTime(persistentID,splite.startTime,splite.length);
}

$scope.toEdit = function(){
  $state.go('index.edit',{
    persistentID:persistentID
  });
};

$scope.nextItem = function(event){
  if(event&&event.diffTime > 500){
    return;
  }

  var index = $scope.spliteIndex;

  if(typeof index == 'undefined'){
    index = -1;
  }

  if(index >= $scope.item.splites.length-1){
    index = -1;
  }
  setSplite(index+1);

};

$scope.backItem = function(event){
  if(event&&event.diffTime > 500){
    return;
  }

  var index = $scope.spliteIndex;
  if(typeof index == 'undefined'){
    index = $scope.item.splites.length;
  }

  if(index == 0){
    index = $scope.item.splites.length;
  }
  setSplite(index-1);

};

  });
