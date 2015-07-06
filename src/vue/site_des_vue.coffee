Vue = require('vue')
exchangeService = require('./../service/exchange_service')
MyUtil = require('./../util/myutils')

config = require('./../config')

SiteDesVue = Vue.extend({
  template: require('../template/site_des.html')
  beforeCompile:()->
})

module.exports = SiteDesVue