// Generated by CoffeeScript 1.9.2
var HeaderVue, MyUtil, Vue, config, exchangeService;

Vue = require('vue');

exchangeService = require('./../service/exchange_service');

MyUtil = require('./../util/myutils');

config = require('./../config');

HeaderVue = Vue.extend({
  template: require('../template/header.html'),
  beforeCompile: function() {
    return this.$set('userInfo', window.oceanContext.userInfo);
  },
  methods: {
    logout: function() {
      exchangeService.removeOceanContext();
      return window.location.reload();
    }
  }
});

module.exports = HeaderVue;
