'use strict';

angular.module('yukiApp')
  .service('Music', function Music(Database,$log,MockService) {

var errorCB = function(event){
  console.log(event);
}

// var clearMusic;
// if(MockService.isMockMode()){
//   clearMusic = new Howl({urls:["/music/clear.m4a"],volume: 0.3});
// }else{
//   clearMusic = new Media('/music/clear.m4a');
// }
// $log.info("init clear music",this.clearMusic);

var Music = function(){      
}

Music.prototype.clear = function(){
  // clearMusic.play();
}

Music.prototype.delete = function(persistentID,func){
  Database.writeStore('music',function(store){
    deleteCB(store);
  });

  function deleteCB(store){
    store.delete(persistentID).onsuccess = function(evt) {
     (func||angular.noop)(evt);
    };
  }

}

Music.prototype.find = function(persistentID,func){
  Database.store('music',function(store){
    storeCB(store);
  });

  function storeCB(store){
    store.get(persistentID).onsuccess = function(evt) {
     func(evt.target.result);
    };
  }

}

Music.prototype.put = function(music,success,fail){
  Database.writeStore('music',function(store){
    storeCb(store);
  });

  function storeCb(store){
    var request = store.put(music);
    console.log('putRequest');
    request.onsuccess = function (event) {
      // 更新後の処理
      console.log('putRequest onsuccess',event);
      (success||angular.noop)(event);
    };
    request.onerror = function(event){
      console.log('putRequest onerror',event);
      (fail||angular.noop)(event);
    };
  }

};

Music.prototype.selectAll = function(done){
  var self = this;
  var musicList = [];
  console.log('selectAll');

  Database.store("music",function(store){        
    storeCb(store);
  });

  function storeCb(store){
    var request = store.openCursor();
    request.onsuccess = function(evt) {
      cursorCb(evt);
    };
    request.onerorr = errorCB;
  }

  function cursorCb(evt){
     var cursor = evt.target.result;
     if(cursor == null){
      console.log('selectAll sucess',musicList);
       done(musicList);
       return;
     }
     var music = cursor.value;
     musicList.push(music);
     cursor.continue();
  }

};

return new Music;

});
