'use strict';

/**
 * @ngdoc directive
 * @name yukiApp.directive:bbYScroll
 * @description
 * # bbYScroll
 */
angular.module('yukiApp')
  .directive('bbYScroll', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.width(10000);
        $timeout(function(){
          var children = element.children();
          // var height = children.outerHeight(true);
          var width = children.outerWidth(true);
          var length = children.length;
          // element.height(height);
          element.width(width * length);

        });
      }
    };
  });
