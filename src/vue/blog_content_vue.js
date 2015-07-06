// Generated by CoffeeScript 1.9.2
var BlogContentVue, Vue, config, exchangeService, myutils;

Vue = require('vue');

exchangeService = require('./../service/exchange_service');

myutils = require('./../util/myutils');

config = require('./../config');

BlogContentVue = Vue.extend({
  template: require('../template/blog_content.html'),
  methods: {
    save: function() {
      return exchangeService.saveBlog(this.$data._id, this.$data, (function(_this) {
        return function(err) {
          if ((err != null)) {
            return myutils.showErrorNoticeWindow(err.errorMessage);
          } else {
            return $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).hide();
          }
        };
      })(this));
    },
    cancel: function() {
      return $.UIkit.modal(config.domIds.blogsVue.blogContentWindow).hide();
    }
  }
});

module.exports = BlogContentVue;