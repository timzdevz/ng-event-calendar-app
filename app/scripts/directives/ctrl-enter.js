'use strict';

angular.module('spbtvcalendarApp')
  .directive('ctrlEnter', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var keysPressed = [];
        element.bind('keydown keyup', function(e){
          keysPressed[e.keyCode] = e.type == 'keydown';
          if(keysPressed[17] && keysPressed[13]) { // ctrl + enter
            scope.$eval(attrs.ctrlEnter);
          }
        });
      }
    };
  });
