config = require('../config')
HeaderVue = require('./../vue/header_vue')
SiteDesVue = require('./../vue/site_des_vue')

module.exports = ()->
  console.log 'Index page'

  new HeaderVue(
    el: config.domIds.mainHeader
  )

  new SiteDesVue(
    el: config.domIds.mainContent
  )