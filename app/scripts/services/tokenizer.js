'use strict';

angular.module('yukiApp')
  .service('Tokenizer', function Tokenizer($log) {
var Tokenizer = function(){
};

Tokenizer.prototype.tokenize = function(text){
  var escape = [/'|"|\.|,|-|\?/g];
  angular.forEach(escape,function(e){
    text = text.replace(e,' ');
  });
  var textList = text.split(/\b\s+/);
  var output = [];
  angular.forEach(textList,function(text){
    if(text != ''){
      output.push(text);
    }
  });
  $log.info(output);
  return output;

};

function startWith(text,prefix){
  return text.lastIndexOf(prefix, 0) == 0;
}

Tokenizer.prototype.compare = function(t1,t2){
  var text1 = this.tokenize(t1);
  var text2 = this.tokenize(t2);
  var output = [];
  for (var i = 0; i < text1.length; i++) {
    var b = '';
    var compare = false;
    var length = text1[i].length;
    var partial = false;
    if(i < text2.length){
      b = text2[i];
      if(i == text2.length -1){
        compare = startWith(text1[i].toLowerCase(),b.toLowerCase());        
        partial = b.length != length;
        length = b.length;
      }else{
        compare = text1[i].toLowerCase() == b.toLowerCase();
      }
    }
    output.push({
      a:text1[i],
      b:b,
      compare:compare,
      length:length,
      partial:partial
    });
  };
  return output;
}

return new Tokenizer;
});
