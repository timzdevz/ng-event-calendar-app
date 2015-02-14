'use strict';

angular.module('spbtvcalendarApp')
  .factory('EventService', function ($localStorage, dateFilter) {

    function obtainNewEventId() {
      if ($localStorage.lastEventId === undefined) {
        $localStorage.lastEventId = 0;
      }

      return ++$localStorage.lastEventId;
    }

    function getDateKey(date) {
      if (date instanceof Date) {
        return dateFilter(date, 'dd/MM/yyyy');
      }

      return date;
    }

    var eventService = {};

    eventService.getEvents = function (date) {
      var dateKey = getDateKey(date);

      return angular.fromJson($localStorage[dateKey]) || [];
    };

    eventService.saveEvents = function(events, date) {
      var dateKey = getDateKey(date);

      $localStorage[dateKey] = angular.toJson(events);
    };

    eventService.addEvent = function (event, date) {
      var dateKey = getDateKey(date);

      event.id = obtainNewEventId();
      this.saveEvent(event, dateKey);

      return event;
    };

    eventService.saveEvent = function (event, date) {
      var dateKey = getDateKey(date);

      var dateEvents = this.getEvents(dateKey);
      if (!dateEvents) {
        dateEvents = [];
      }

      // replace event if exists
      _.remove(dateEvents, {'id': event.id});
      dateEvents.push(event);

      this.saveEvents(dateEvents, dateKey);
    };

    eventService.removeEvent = function (eventId, date) {
      var dateKey = getDateKey(date);

      var events = this.getEvents(dateKey);
      if (!events) {
        return false;
      }

      var removed = _.remove(events, {'id': eventId}).length > 0;
      if (removed) {
        if(events.length > 0) {
          this.saveEvents(events, dateKey);
        } else {
          delete $localStorage[dateKey];
        }
      }

      return removed;
    };

    return eventService;
  });
