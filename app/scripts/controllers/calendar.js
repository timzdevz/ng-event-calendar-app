'use strict';

angular.module('spbtvcalendarApp')
  .controller('CalendarCtrl', function ($scope, EventCalendar, EventService) {
    $scope.cal = new EventCalendar();

    loadCalData();

    $scope.nextMonth = function() {
      $scope.cal.nextMonth();
      loadCalData();
    };

    $scope.prevMonth = function() {
      $scope.cal.prevMonth();
      loadCalData();
    };

    $scope.addEvent = function(event, date) {
      return EventService.addEvent(event, date);
    };

    $scope.removeEvent = function(event, date) {
      EventService.removeEvent(event.id, date);
    };

    function loadCalData() {
      $scope.displayDates = getDisplayDates();
    }

    function getDisplayDates() {
      return _.chunk(
        $scope.cal.getDatesForMonthDisplay(),
        $scope.cal.daysOfTheWeek.length);
    }

  });
