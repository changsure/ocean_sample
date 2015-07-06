config = require('../config')
HeaderVue = require('./../vue/header_vue')
LoginVue = require('./../vue/login_vue')

module.exports = ()->
  console.log 'Login page'
  new HeaderVue(
    el: config.domIds.mainHeader
  )

  new LoginVue(
    el:config.domIds.mainContent
  )