'use strict';

/**
 * @ngdoc function
 * @name yukiApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the yukiApp
 */
angular.module('yukiApp')
  .controller('EditCtrl', function ($scope,$stateParams,Music,$state,MusicPlugin,$log,$timeout) {

$scope.initialized = false;
var persistentID = $stateParams.persistentID;
$scope.started=false;
$scope.initialized = false;
var persistentID = 
  $scope.persistentID = $stateParams.persistentID;

var previousTime = 0;


Music.find(persistentID,function(data){
  $scope.$apply(function(){
    init(data);
  });
});

function init(data){
    $scope.item = data;
    if(data.splites == null){
      data.splites = [];
    }
    if(data.splites.length > 0){
      setSplite(0);
    }
    $scope.initialized = true;

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

$scope.selectSplite = function(splite,index){
  if($scope.started){
    $scope.setTime(splite.startTime + splite.length);
  }else{
    // $scope.splite = splite;
    setSplite(index);
    $scope.playWithTime($scope.splite);
  }
}

$scope.toItem = function(){
  $state.go('index.item',{
    persistentID:persistentID
  });
}

$scope.play = function(){
  setSplite(-1);

  MusicPlugin.play(persistentID);
  $scope.started = true;
  previousTime = 0;
  // $scope.music.splites = [];
};

$scope.clear = function(){
  $scope.item.splites = [];
};

$scope.clearDisabled = function(){
  var splites= [];
  angular.forEach($scope.item.splites,function(splite){
    if(splite.delete != true){
      splites.push(splite);
    }
  });
  $scope.item.splites = splites;
};

$scope.keyEvent = function(event){
  if(event.keyCode == 13){
    var splite = $scope.splite;
    $scope.playWithTime(splite);
    event.preventDefault();      
    return false;
  }
}

$scope.playWithTime = function(splite){
  MusicPlugin.playWithTime(persistentID,splite.startTime,splite.length);
}

$scope.stop = function(){
  $scope.started = false;
  MusicPlugin.stop();
  setSplite(0);
};

$scope.back = function(time){
  MusicPlugin.back(time);
}

$scope.nextItem = function(){
  var index = $scope.spliteIndex;

  if(typeof index == 'undefined'){
    index = -1;
  }

  if(index >= $scope.item.splites.length-1){
    index = -1;
  }
  setSplite(index+1);

}

$scope.backItem = function(){
  var index = $scope.spliteIndex;
  if(typeof index == 'undefined'){
    index = $scope.item.splites.length;
  }

  if(index == 0){
    index = $scope.item.splites.length;
  }
  setSplite(index-1);

}

$scope.setTime = function(time){
  previousTime = time;
  MusicPlugin.playWithTime(persistentID,time);
}

$scope.redo = function(){
  if($scope.item.splites.length == 0){
    $scope.setTime(0);
  }
  else if($scope.item.splites.length == 1){
    $scope.item.splites = [];
    $scope.setTime(0);
  }
  else{
    $scope.item.splites.splice($scope.item.splites.length-1,1);
    var splite = $scope.item.splites[$scope.item.splites.length-1];
    $scope.setTime(splite.startTime + splite.length);
  }
   
}

$scope.clip = function(){

  MusicPlugin.time(function(time){
    addTime(time);
  });

  function addTime(time){
    $log.info(time);
    var length = time - previousTime;
    $scope.item.splites.push(
      {
        startTime:previousTime,
        length:length
    });
    setSplite($scope.item.splites.length - 1 );
    previousTime = time;
    $scope.$apply();
  }

};

$scope.save = function(){
  $scope.clearDisabled();
  var splites = [];
  angular.forEach($scope.item.splites,function(splite){
    if(splite.delete){
      return;
    }
    splites.push(splite);
  });
  $scope.item.splites = splites;


  Music.put($scope.item,function(){
    alert('Save Succes');
    $scope.toItem();
  });
}

$scope.showDelete = false;

$scope.remove = function(){
  Music.delete(persistentID,function(){
    $state.go('index.items',null,{
      reload:true
    });     
  });
};

});
