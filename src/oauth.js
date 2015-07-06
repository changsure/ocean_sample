// Generated by CoffeeScript 1.9.2
var $, config, getUrlParam, oceanService, pageService;

$ = window.$;

config = require('./config');

oceanService = require('./service/exchange_service');

pageService = require('./service/page_service');

$(document).ready(function() {
  return pageService.checkAndRefreshLocalStorage(function() {
    var code, error, type;
    type = getUrlParam('type');
    if (type === 'weibo') {
      code = getUrlParam('code');
      error = getUrlParam('error');
      if ((error != null) && error !== '') {
        alert('Login failed!');
        return window.close();
      } else {
        return oceanService.authWeiboLogin(code, function(err, appUser) {
          if ((err != null)) {
            return alert(JSON.stringify(err));
          } else {
            return oceanService.fetchOceanContext(appUser.appUserAccessCode, function(err) {
              if ((err != null)) {
                return alert(JSON.stringify(err));
              } else {
                window.opener.location = config.siteAddress;
                return window.close();
              }
            });
          }
        });
      }
    } else if (type === 'facebook') {
      code = getUrlParam('code');
      error = getUrlParam('error');
      if ((error != null) && error !== '') {
        return window.close();
      } else {
        return oceanService.authFacebookLogin(code, function(err, appUser) {
          if ((err != null)) {
            alert('Login Failed!');
            return console.log(JSON.stringify(err));
          } else {
            return oceanService.fetchOceanContext(appUser.appUserAccessCode, function(err) {
              if ((err != null)) {
                alert('Login Failed!');
                return console.log(JSON.stringify(err));
              } else {
                window.opener.location = config.siteAddress;
                return window.close();
              }
            });
          }
        });
      }
    } else {
      return alert('No support 3rd type!');
    }
  });
});

getUrlParam = function(name) {
  var r, reg;
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return unescape(r[2]);
  }
  return null;
};
