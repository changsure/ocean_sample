Vue = require('vue')
exchangeService = require('./../service/exchange_service')
MyUtil = require('./../util/myutils')

config = require('./../config')

HeaderVue = Vue.extend({
  template: require('../template/header.html')
  beforeCompile:()->
    this.$set('userInfo',window.oceanContext.userInfo)
  methods:
    logout: ()->
      exchangeService.removeOceanContext()
      window.location.reload()
})

module.exports = HeaderVue