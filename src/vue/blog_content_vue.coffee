Vue = require('vue')
exchangeService = require('./../service/exchange_service')
myutils = require('./../util/myutils')
config = require('./../config')

BlogContentVue = Vue.extend({
  template: require('../template/blog_content.html')
  methods:
    save:()->

      exchangeService.saveBlog(this.$data._id,this.$data,(err)=>
        if(err?)
          myutils.showErrorNoticeWindow(err.errorMessage)
        else
          $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).hide()
      )

    cancel:()->
      $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).hide()
})

module.exports = BlogContentVue