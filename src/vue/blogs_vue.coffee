Vue = require('vue')
$= window.$
exchangeService = require('./../service/exchange_service')
myutils = require('./../util/myutils')
config = require('./../config')
BlogContentVue = require('./blog_content_vue')


BlogsVue = Vue.extend({
  template: require('../template/blogs.html')
  beforeCompile:()->
    this.queryBlogs()
  ready:()->
    $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).options.bgclose = false
    $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).on(
      'hide.uk.modal':()=>
        this.queryBlogs()
    )
  methods:
    toAddBlog:()->
      new BlogContentVue(
        el:config.domIds.blogsVue.blogContentContainer
        data:{}
      )
      $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).show()
    toUpdateBlog:(blog)->
      new BlogContentVue(
        el:config.domIds.blogsVue.blogContentContainer
        data:blog
      )
      $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).show()

    deleteBlog:(blog)->
      if(window.confirm("Do you really want to delete blog: " + blog.title ))
        exchangeService.deleteBlog(blog._id,(error)=>
          if(err?)
            myutils.showErrorNoticeWindow(err.errorMessage)
          else
            myutils.showInfoNoticeWindow("Delete blog success!")
            this.queryBlogs()
        )

    queryBlogs:()->
      exchangeService.queryBlog(null,null,null,(err,blogs)=>
        if(err?)
          myutils.showErrorNoticeWindow(err.errorMessage)
        else
          this.$set('blogs',blogs)
          if(blogs.length > 0)
            $("#no_blogs_div").addClass("uk-hidden")
          else
            $("#no_blogs_div").removeClass("uk-hidden")
      )
})

module.exports = BlogsVue