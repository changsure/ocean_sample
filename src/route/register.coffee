config = require('../config')
HeaderVue = require('./../vue/header_vue')
RegisterVue = require('./../vue/register_vue')

module.exports = ()->
  new HeaderVue(
    el: config.domIds.mainHeader
  )

  new RegisterVue(
    el:config.domIds.mainContent
    data:{}
  )