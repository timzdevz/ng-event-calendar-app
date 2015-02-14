'use strict';

angular.module('spbtvcalendarApp').factory('EventCalendar', function (EventService) {

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  var daysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  var daysInTheWeek = 7;
  var rowsInTheCalendar = 6;
  var totalDaysInCalendarDisplay = daysInTheWeek * rowsInTheCalendar;

  function Calendar() {
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();

    this.daysOfTheWeek = daysOfTheWeek;
  }

  Calendar.prototype.getDatesForMonthDisplay = function () {
    var firstDayOfMonthDate = new Date(this.currentYear, this.currentMonth, 1);
    var lastDayOfMonthDate = new Date(this.currentYear, this.currentMonth + 1, 0);

    var daysToPrepend = firstDayOfMonthDate.getDay();
    var daysToAppend = daysInTheWeek - (lastDayOfMonthDate.getDay() + 1);

    var currentMonthDates = [];

    for (var i = 1; i <= lastDayOfMonthDate.getDate(); i++) {
      var date = new Date(this.currentYear, this.currentMonth, i);
      date.currentMonthDate = true;
      if (date.getTime() === this.currentDate.getTime()) {
        date.currentDate = true;
      }

      currentMonthDates.push(date);
    }

    //  let's append 6th row in calendar in case there is none
    var totalDaysToAppend = daysToAppend +
      (totalDaysInCalendarDisplay - (daysToPrepend + daysToAppend + currentMonthDates.length));

    var datesToDisplay = this.extendByDays(daysToPrepend, totalDaysToAppend, currentMonthDates);

    _.forEach(datesToDisplay, function (date) {
      date.events = EventService.getEvents(date);

    });

    return datesToDisplay;
  };

  Calendar.prototype.nextMonth = function () {
    var date = this.increaseMonth(this.currentMonth, this.currentYear);
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
  };

  Calendar.prototype.prevMonth = function () {
    var date = this.decreaseMonth(this.currentMonth, this.currentYear);
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
  };

  Calendar.prototype.getMonthName = function () {
    return monthNames[this.currentMonth];
  };

  Calendar.prototype.extendByDays = function (daysToPrepend, daysToAppend, currentMonthDates) {
    var datesToPrepend = [];
    var datesToAppend = [];
    var monthDate = currentMonthDates[0];

    var prevMonthDate = this.decreaseMonth(monthDate.getMonth(), monthDate.getFullYear());
    var nextMonthDate = this.increaseMonth(monthDate.getMonth(), monthDate.getFullYear());

    var daysInPrevMonth = this.getDaysInMonth(prevMonthDate.getMonth(), prevMonthDate.getFullYear());

    if (daysToPrepend > 0) {
      for (var i = 0; i < daysToPrepend; i++) {
        datesToPrepend.push(
          new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), daysInPrevMonth - i));
      }
      datesToPrepend.reverse();
    }

    if (daysToAppend > 0) {
      for (var k = 1; k <= daysToAppend; k++) {
        datesToAppend.push(new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), k));
      }
    }

    var datesToDisplay = datesToPrepend.concat(currentMonthDates);
    datesToDisplay = datesToDisplay.concat(datesToAppend);

    return datesToDisplay;
  };

  Calendar.prototype.increaseMonth = function (month, year) {
    if (++month > 11) {
      month = 0;
      year++;
    }

    return new Date(year, month);
  };

  Calendar.prototype.decreaseMonth = function (month, year) {
    if (--month < 0) {
      month = 11;
      year--;
    }

    return new Date(year, month);
  };

  Calendar.prototype.getDaysInMonth = function (month, year) {
    return new Date(year, month + 1, 0).getDate();
  };

  return Calendar;
});
