// Generated by CoffeeScript 1.9.2
var $, BlogContentVue, BlogsVue, Vue, config, exchangeService, myutils;

Vue = require('vue');

$ = window.$;

exchangeService = require('./../service/exchange_service');

myutils = require('./../util/myutils');

config = require('./../config');

BlogContentVue = require('./blog_content_vue');

BlogsVue = Vue.extend({
  template: require('../template/blogs.html'),
  beforeCompile: function() {
    return this.queryBlogs();
  },
  ready: function() {
    $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).options.bgclose = false;
    return $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).on({
      'hide.uk.modal': (function(_this) {
        return function() {
          return _this.queryBlogs();
        };
      })(this)
    });
  },
  methods: {
    toAddBlog: function() {
      new BlogContentVue({
        el: config.domIds.blogsVue.blogContentContainer,
        data: {}
      });
      return $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).show();
    },
    toUpdateBlog: function(blog) {
      new BlogContentVue({
        el: config.domIds.blogsVue.blogContentContainer,
        data: blog
      });
      return $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).show();
    },
    deleteBlog: function(blog) {
      if (window.confirm("Do you really want to delete blog: " + blog.title)) {
        return exchangeService.deleteBlog(blog._id, (function(_this) {
          return function(error) {
            if ((typeof err !== "undefined" && err !== null)) {
              return myutils.showErrorNoticeWindow(err.errorMessage);
            } else {
              myutils.showInfoNoticeWindow("Delete blog success!");
              return _this.queryBlogs();
            }
          };
        })(this));
      }
    },
    queryBlogs: function() {
      return exchangeService.queryBlog(null, null, null, (function(_this) {
        return function(err, blogs) {
          if ((err != null)) {
            return myutils.showErrorNoticeWindow(err.errorMessage);
          } else {
            _this.$set('blogs', blogs);
            if (blogs.length > 0) {
              return $("#no_blogs_div").addClass("uk-hidden");
            } else {
              return $("#no_blogs_div").removeClass("uk-hidden");
            }
          }
        };
      })(this));
    }
  }
});

module.exports = BlogsVue;