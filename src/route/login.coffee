config = require('../config')
HeaderVue = require('./../vue/header_vue')


module.exports = ()->
  console.log 'Login page'
  new HeaderVue(
    el: config.domIds.mainHeader
  )