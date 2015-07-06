config = require('../config')
HeaderVue = require('./../vue/header_vue')
LoginVue = require('./../vue/login_vue')

module.exports = ()->
  new HeaderVue(
    el: config.domIds.mainHeader
  )

  new LoginVue(
    el:config.domIds.mainContent
  )