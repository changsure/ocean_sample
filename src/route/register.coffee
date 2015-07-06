config = require('../config')
HeaderVue = require('./../vue/header_vue')
RegisterVue = require('./../vue/register_vue')

module.exports = ()->
  console.log 'Register page'
  new HeaderVue(
    el: config.domIds.mainHeader
  )

  new RegisterVue(
    el:config.domIds.mainContent
    data:{}
  )