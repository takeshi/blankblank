'use strict';

angular.module('yukiApp')
  .service('Database', function Database($timeout) {

var version = 5;

var errorCB = function(event){
  console.log(event);
}

var Database = function(){
};

Database.prototype.indexDb = function(){
  var indexDB = window.indexedDB || SQLitePlugin.indexedDB;
  return indexDB;
}

Database.prototype.getDatabase = function(func){

  var indexedDB = this.indexDb();

  console.log("getDatabase");

  if(indexedDB == null){
    window.alert("DataBaseは使えません。");
    return;
  }

  var openRequest = indexedDB.open("yuki", version);
  
  openRequest.onupgradeneeded = function(event) {
    console.log("getDatabase#onupgradeneeded");
    createSchema(event);
  }

  openRequest.onsuccess = function(event) {
      console.log("getDatabase#onsuccess");
      func(event.target.result);
  }

  openRequest.onerror = errorCB;

  function createSchema(event){

    // // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
    var db = event.target.result;
    var store = db.createObjectStore("music", { keyPath: "persistentID"});
     
    // インデックスを作成します。
    store.createIndex("persitentIDIndex", "persistenceId");
  }

};

Database.prototype.open = function(func){
  var self = this;
  if(this.db){
    $timeout(function(){
      func(self.db);
    });
    return;
  }
  return this.getDatabase(func);
};

Database.prototype.writeStore = function(name,func){
  this.open(function(db){
    var store = db.transaction(name, "readwrite").objectStore(name);
    func(store);
  });
};
Database.prototype.store = function(name,func){
  this.open(function(db){
    var store = db.transaction(name).objectStore(name);
    func(store);
  });
};

Database.prototype.isInited = function(){
  return this.db != null;
}

Database.prototype.init = function(func){
  var self = this;
  console.log('Database#init');
  this.open(function(db){
    self.db = window.db = db;
    if(func){
      func(db);
    }
  });
};

Database.prototype.deleteDatabase = function(success,fail){
  var indexDb = this.indexDb();
  var deleteDbRequest = indexDb.deleteDatabase('yuki');
   deleteDbRequest.onsuccess = function (event) {
      console.log('Database#deleteDatabase');
      (success||angular.noop)();
   };

   deleteDbRequest.onerror = function (e) {
      console.log("Database error: " + e.target.errorCode);
      (fail||angular.noop)();
   };

  this.db = null;
};

return new Database;

});
