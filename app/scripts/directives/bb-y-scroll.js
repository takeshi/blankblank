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
      scope:{
        scrollleft:'&'
      },
      link: function postLink(scope, element, attrs) {
        // element.width(10000);

        scope.$watch(function(){
          var children = element.children();

          var width = 0;
          angular.forEach(children,function(child){
            width += $(child).outerWidth(true);          
          });

          return width;
        },function(width){
          element.width(width);
          // if(scope.scrollleft){
          //   element.parent().scrollLeft(width);
          // }
        });

        scope.$watch(function(){
          var index = scope.scrollleft();
          var children = element.children();

          var width = -50;
          angular.forEach(children,function(child,i){
            if(i >= index){
              return;
            }
            width += $(child).outerWidth(true);          
          });
          return Math.max(width,0);
        },function(width){
          element.parent().scrollLeft(width);
        });

      }
    };
  });
