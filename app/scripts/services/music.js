'use strict';

/**
 * @ngdoc service
 * @name yukiApp.music
 * @description
 * # music
 * Service in the yukiApp.
 */
angular.module('yukiApp')
  .service('Music', function music($timeout) {

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
    return {
      findById:function(id,callback){
        $timeout(function(){
          callback(mockMusicData);
        });
      }
    };

  });
