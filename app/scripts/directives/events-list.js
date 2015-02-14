'use strict';

/**
 * @ngdoc directive
 * @name spbtvcalendarApp.directive:eventsList
 * @description
 * # eventsList
 */
angular.module('spbtvcalendarApp')
  .directive('eventsList', function () {
    return {
      templateUrl: 'partials/directives/events-list.directive.html',
      restrict: 'E',
      replace: true,
      scope: true,
      link: function(scope, element, attrs) {
        scope.events = scope.$eval(attrs.events);
        scope.fullList = scope.$eval(attrs.fullList);
        scope.remove = scope.$eval(attrs.remove);
        scope.limit = scope.$eval(attrs.limit);
      },
      controller: function($scope) {
        var evTitleLength = 11;

        $scope.getTitle = function (text) {
          text = text || '';
          return text.length > evTitleLength ? text.slice(0, evTitleLength) + '...' : text
        };
      }
    };
  });
