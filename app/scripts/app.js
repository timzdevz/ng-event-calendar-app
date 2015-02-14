'use strict';

angular.module('spbtvcalendarApp', [
  'ngStorage'
]).run(function ($rootScope) {
  // integrate lodash into views
  $rootScope._ = window._;
});

var SpbTVCalendar = SpbTVCalendar || {};

// helper functions go here
SpbTVCalendar.helpers = {
  HorizontallyBound: function ($parentElem, $childElem) {
    var parentRect = $parentElem[0].getBoundingClientRect();
    var childRect = $childElem[0].getBoundingClientRect();

    return parentRect.left <= childRect.left && parentRect.right >= childRect.right;
  }
};
