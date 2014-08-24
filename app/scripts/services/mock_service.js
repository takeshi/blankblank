'use strict';

angular.module('yukiApp')
  .service('MockService', function MockService() {

var MockService = function(){      
};

MockService.prototype.isMockMode = function(){
  return typeof Cordova == 'undefined';
};

return new MockService;

});
