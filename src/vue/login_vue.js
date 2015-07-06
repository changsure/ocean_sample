// Generated by CoffeeScript 1.9.2
var $, LoginVue, Vue, config, exchangeService, myutils;

Vue = require('vue');

$ = window.$;

config = require('../config');

exchangeService = require('./../service/exchange_service');

myutils = require('./../util/myutils');

LoginVue = Vue.extend({
  template: require('../template/login.html'),
  methods: {
    signIn: function() {
      var loginUser;
      if ((this.$data.email == null) || (this.$data.password == null)) {
        return $("form[name='login_form'] [name='loginMessage']").html('Required email and password!');
      } else {
        loginUser = {
          accountName: this.$data.email,
          password: this.$data.password,
          rememberMe: this.$data.rememberMe
        };
        return exchangeService.loginAccount(loginUser, function(err, appUserAccessCode) {
          if ((err != null)) {
            return $("form[name='login_form'] [name='loginMessage']").html(err.errorMessage);
          } else {
            return exchangeService.fetchOceanContext(appUserAccessCode, function(err) {
              if ((err != null)) {
                return myutils.showErrorNoticeWindow(err.errorMessage);
              } else {
                myutils.showInfoNoticeWindow('Login success!');
                return window.setTimeout(function() {
                  return window.location = config.siteAddress;
                }, 2000);
              }
            });
          }
        });
      }
    },
    loginWeibo: function() {
      var iHeight, iLeft, iTop, iWidth, weibologin;
      iWidth = 770;
      iHeight = 450;
      iTop = (window.screen.availHeight - 30 - iHeight) / 2;
      iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
      return weibologin = window.open('https://api.weibo.com/oauth2/authorize?client_id=418415227&response_type=code&redirect_uri=http://sampleblog.app.oceanclouds.com/oauth/oauth.html?type=weibo', 'WeiboLogin', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
    },
    loginFb: function() {
      var iHeight, iLeft, iTop, iWidth, weibologin;
      iWidth = 550;
      iHeight = 300;
      iTop = (window.screen.availHeight - 30 - iHeight) / 2;
      iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
      return weibologin = window.open('https://www.facebook.com/dialog/oauth?client_id=1453338874969497&display=popup&redirect_uri=http://sampleblog.app.oceanclouds.com/oauth/oauth.html?type=facebook', 'FacebookLogin', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
    }
  }
});

module.exports = LoginVue;
