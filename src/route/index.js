// Generated by CoffeeScript 1.9.2
var HeaderVue, SiteDesVue, config;

config = require('../config');

HeaderVue = require('./../vue/header_vue');

SiteDesVue = require('./../vue/site_des_vue');

module.exports = function() {
  console.log('Index page');
  new HeaderVue({
    el: config.domIds.mainHeader
  });
  return new SiteDesVue({
    el: config.domIds.mainContent
  });
};