'use strict';

angular.module('yukiApp')
  .service('MusicPlugin', function MusicPlugin(MockService,$state,$timeout) {

var mockMusicData = {"albumArtist":"WongWingTsan",
  "isCompilation":"0","composer":"WongWingTsan",
  "playbackDuration":"51.333",
  "title":"A Little < Epilogue >",
  "albumTrackCount":"10",
  "isCloudItem":"0",
  "podcastPID":"-3365975749699339542",
  "persistentID":"912040801841232857",
  "bookmarkTime":"0",
  "artistPID":"3046288795238954920",
  "discCount":"1",
  "albumTitle":"Fragrance",
  "podcastTitle":"Fragrance",
  "playCount":"85",
  "mediaType":"1",
  "composerPID":"-7618090759665620205",
  "albumTrackNumber":"10",
  "artist":"WongWingTsan",
  "genrePID":"-6175046379429825066",
  "discNumber":"1",
  "genre":"New Age",
  "albumArtistPID":"5281435639881884017",
  "skipCount":"0",
  "albumPID":"-3365975749699339542",
  "rating":"0"
};

var MusicPlugin = function(){
  this.startTime = 0;
};

MusicPlugin.prototype.openWindow = function(success,fail){

  if(MockService.isMockMode()){
    var err = new Error();
    // console.log("Open Music Window",err.stack);
    alert("Open Music Window ");
    $timeout(function(){
      if(success){
        success(mockMusicData);        
      }
    },100);
    return;
  }

  Cordova.exec(
    function(ret){
      if(success){
        success(ret);
      }
    }, 
    function(error){
      if(fail){
        fail(error);
      }
    }, 
    'MusicPlugin', 
    'openWindow',
    []
  );
};

MusicPlugin.prototype.play = function(persistenceId){
  this.startTime = new Date().getTime();
  if(MockService.isMockMode()){
    alert("play " + persistenceId)
    return;
  }
  
  Cordova.exec(
    function(ret){
      console.log(ret);
    }, 
    function(error){
      console.log(error);
    }, 
    'MusicPlugin', 
    'play',
    [persistenceId]
  );

};

MusicPlugin.prototype.stop = function(){
  if(MockService.isMockMode()){
    alert("stop")
    return;
  }
  
  Cordova.exec(
    function(ret){
      console.log(ret);
    }, 
    function(error){
      console.log(error);
    }, 
    'MusicPlugin', 
    'stop',
    []
  );

};

MusicPlugin.prototype.playWithTime = function(persistenceId,time,length){
  if(MockService.isMockMode()){
    $timeout(function(){
      alert('playWithTime(' + persistenceId + ',' + time + ',' + length + ')');
    });
    return;
  }
  
  Cordova.exec(
    function(ret){
      func(ret);
    }, 
    function(error){
      console.log(error);
    }, 
    'MusicPlugin', 
    'playWithTime',
    [persistenceId,time,length]
  );

};

MusicPlugin.prototype.time = function(func){
  var self = this;
  if(MockService.isMockMode()){
    $timeout(function(){
      func(new Date().getTime() - self.startTime );
    });
    return;
  }
  
  Cordova.exec(
    function(ret){
      func(ret);
    }, 
    function(error){
      console.log(error);
    }, 
    'MusicPlugin', 
    'time',
    []
  );

};

MusicPlugin.prototype.back = function(time){
  var self = this;
  if(MockService.isMockMode()){
    $timeout(function(){
      alert("back " + time);
    });
    return;
  }
  
  Cordova.exec(
    function(ret){
      func(ret);
    }, 
    function(error){
      console.log(error);
    }, 
    'MusicPlugin', 
    'back',
    [time]
  );

};

return new MusicPlugin;

  });
