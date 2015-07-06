config = require('../config')
HeaderVue = require('./../vue/header_vue')
SiteDesVue = require('./../vue/site_des_vue')
BlogsVue = require('./../vue/blogs_vue')
ExchangeService = require('./../service/exchange_service')
MyUtil = require('./../util/myutils')

module.exports = ()->
  console.log 'Index page'

  new HeaderVue(
    el: config.domIds.mainHeader
  )

  if(window.oceanContext.userInfo.login)
    new BlogsVue(
      el:config.domIds.mainContent
    )
  else
    new SiteDesVue(
      el: config.domIds.mainContent
    )