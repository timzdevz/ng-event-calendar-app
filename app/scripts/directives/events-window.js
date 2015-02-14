'use strict';

angular.module('spbtvcalendarApp')
  .directive('eventsWindow', function () {
    return {
      templateUrl: 'partials/directives/events-window.directive.html',
      restrict: 'E',
      replace: true,
      link: function(scope, elem) {
        var $windowElem = $(elem),
            $dateElem = $(scope.dateElem);

        // close event window if exists
        var openedEventWindow = $('#events-window');

        if(openedEventWindow.length) {
          // event window was clicked again, just hide it
          if($dateElem.find(openedEventWindow).length) {
            openedEventWindow.remove();
            return;
          }

          openedEventWindow.remove();
        }

        $dateElem.append($windowElem);

        // if window doesn't fit in table, let's change floating to left
        if (!SpbTVCalendar.helpers.HorizontallyBound($windowElem.closest('table'), $windowElem)) {
          $windowElem.addClass('float-left');
        }

        // overflow scrollbar still persists after changing abs position
        // so let's reattach window element to reset scrollbar
        $windowElem.detach().appendTo($dateElem);

        $windowElem.find('textarea').focus();
      },
      controller: function($scope) {
        $scope.newEvent = {};

        $scope.remove = function (event) {
          $scope.removeEvent(event, $scope.date);
          _.remove($scope.date.events, event);
        };

        $scope.add = function () {
          $scope.newEvent = $scope.addEvent($scope.newEvent, $scope.date);
          $scope.date.events.push(angular.copy($scope.newEvent));
          $scope.newEvent = {};
        };

        $scope.submitForm = function () {
          if ($scope.eventForm.newEvent.$valid) {
            $scope.add();
            $scope.eventForm.$setPristine();
            $scope.$apply();
          }
        };
      }
    };
  });
