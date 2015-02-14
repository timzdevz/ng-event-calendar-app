'use strict';

angular.module('spbtvcalendarApp')
  .directive('calDate', function ($compile) {
    return {
      templateUrl: 'partials/directives/date.directive.html',
      restrict: 'A',
      link: function (scope, elem) {
        scope.dateElem = elem;
      },
      controller: function ($scope) {
        $scope.toggleEventWindow = function () {
          $compile($('<events-window></events-window>'))($scope);
        };
      }
    };
  });
