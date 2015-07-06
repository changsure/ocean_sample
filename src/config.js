// Generated by CoffeeScript 1.9.2
var config;

config = {};

config.appKey = 'sample_app';

config.siteAddress = 'http://sampleblog.app.oceanclouds.com/';

config.apiResources = {
  userRegister: function() {
    return window.oceanContext.backServices.user.api + '/register';
  },
  userLogin: function() {
    return window.oceanContext.backServices.user.api + '/login';
  },
  userUpdate: function() {
    return window.oceanContext.backServices.user.api + '/update';
  },
  getOceanContext: function() {
    return 'https://api.oceanclouds.com/v1/app/' + config.appKey + '/getOceanContext';
  },
  authWeiboLogin: function(code) {
    return window.oceanContext.backServices.weibo.api + '/authwb/' + config.appKey + '/auth' + '?code=' + code;
  },
  authFacebookLogin: function(code) {
    return window.oceanContext.backServices.facebook.api + '/authfb/' + config.appKey + '/auth' + '?code=' + code;
  },
  blogCrudAddress: function(_id, isQuery) {
    if ((_id != null)) {
      return window.oceanContext.backServices.crud.api + '/' + config.appKey + '/blog/' + _id;
    } else if (isQuery) {
      return window.oceanContext.backServices.crud.api + '/' + config.appKey + '/blog/find/query';
    } else {
      return window.oceanContext.backServices.crud.api + '/' + config.appKey + '/blog';
    }
  }
};

config.domIds = {
  mainHeader: '#main_header',
  mainContent: '#main_content',
  blogsVue: {
    blogContentWindow: "#blog_content_window",
    blogContentContainer: "#blog_content_container"
  }
};

module.exports = config;
