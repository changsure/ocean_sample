// Generated by CoffeeScript 1.9.1
var OceanFilter, Vue, dateFormat, dateTimeFilter, registerFilter;

Vue = require('vue');

dateFormat = require('dateformat');

registerFilter = function() {
  return Vue.filter('datetime', dateTimeFilter);
};

dateTimeFilter = function(value, pattern) {
  var datetime, formatted;
  if ((value == null) || (value = 0 || (value = ''))) {
    return '';
  }
  datetime = new Date(value * 1000);
  if ((pattern != null)) {
    formatted = dateFormat(datetime, pattern);
  } else {
    formatted = dateFormat(datetime, 'mm/dd/yyyy HH:MM:ss');
  }
  return formatted;
};

OceanFilter = {
  registerFilter: registerFilter
};

module.exports = OceanFilter;