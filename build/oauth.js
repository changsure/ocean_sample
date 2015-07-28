(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  getAnonymousOceanContext: function(endUserAccessToken) {
    return 'https://api.oceanclouds.com/v1.0/public/ocean_context/' + config.appKey;
  },
  getEndUserOceanContext: function() {
    return 'https://api.oceanclouds.com/v1.0/end/ocean_context/' + config.appKey;
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

},{}],2:[function(require,module,exports){
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
        return oceanService.authWeiboLogin(code, function(err, accessToken) {
          if ((err != null)) {
            return alert(JSON.stringify(err));
          } else {
            return oceanService.fetchOceanContext(accessToken, function(err) {
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
        return oceanService.authFacebookLogin(code, function(err, accessToken) {
          if ((err != null)) {
            alert('Login Failed!');
            return console.log(JSON.stringify(err));
          } else {
            return oceanService.fetchOceanContext(accessToken, function(err) {
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

},{"./config":1,"./service/exchange_service":3,"./service/page_service":4}],3:[function(require,module,exports){
// Generated by CoffeeScript 1.9.2
var $, authFacebookLogin, authWeiboLogin, config, deleteBlog, fetchOceanContext, localStorage, loginAccount, oceanService, queryBlog, readBlog, registerAccount, removeOceanContext, saveBlog, updateAccount;

$ = window.$;

config = require('./../config');

localStorage = window.localStorage;

registerAccount = function(user, callback) {
  return $.ajax({
    type: "POST",
    url: config.apiResources.userRegister(),
    headers: {
      "Ocean-Auth": window.oceanContext.backServices.user.oceanAuthHeader
    },
    data: user
  }).done(function(response) {
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      return callback();
    }
  });
};

loginAccount = function(user, callback) {
  return $.ajax({
    type: "POST",
    url: config.apiResources.userLogin(),
    headers: {
      "Ocean-Auth": window.oceanContext.backServices.user.oceanAuthHeader
    },
    data: user
  }).done(function(response) {
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      return callback(null, response.entity.accessToken);
    }
  });
};

updateAccount = function(user, callback) {
  user.account = window.oceanContext.userInfo.email;
  return $.ajax({
    type: "PUT",
    url: config.apiResources.userUpdate(),
    headers: {
      "Ocean-Auth": window.oceanContext.backServices.user.oceanAuthHeader
    },
    data: user
  }).done(function(response) {
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      return callback(null, response.entity);
    }
  });
};

fetchOceanContext = function(endUserAccessToken, callback) {
  var url;
  if ((endUserAccessToken != null)) {
    url = config.apiResources.getEndUserOceanContext();
  } else {
    url = config.apiResources.getAnonymousOceanContext();
  }
  return $.ajax({
    type: "GET",
    url: url,
    headers: {
      "AccessToken": endUserAccessToken
    }
  }).done(function(response) {
    var oceanContext;
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      oceanContext = response.entity;
      window.oceanContext = oceanContext;
      localStorage.removeItem('oceanContext');
      localStorage.setItem('oceanContext', JSON.stringify(oceanContext));
      return callback();
    }
  });
};

removeOceanContext = function() {
  window.oceanContext = {};
  return localStorage.removeItem('oceanContext');
};

authWeiboLogin = function(code, callback) {
  return $.ajax({
    type: "GET",
    url: config.apiResources.authWeiboLogin(code),
    headers: {
      "Ocean-Auth": window.oceanContext.backServices.weibo.oceanAuthHeader
    }
  }).done(function(response) {
    var ref;
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      return callback(null, (ref = response.entity) != null ? ref.accessToken : void 0);
    }
  });
};

authFacebookLogin = function(code, callback) {
  return $.ajax({
    type: "GET",
    url: config.apiResources.authFacebookLogin(code),
    headers: {
      "Ocean-Auth": window.oceanContext.backServices.facebook.oceanAuthHeader
    }
  }).done(function(response) {
    var ref;
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      return callback(null, (ref = response.entity) != null ? ref.accessToken : void 0);
    }
  });
};

saveBlog = function(_id, blog, callback) {
  if ((_id != null) && _id !== '') {
    return $.ajax({
      type: "PUT",
      url: config.apiResources.blogCrudAddress(_id, false),
      headers: {
        "Ocean-Auth": window.oceanContext.backServices.crud.oceanAuthHeader
      },
      data: blog
    }).done(function(response) {
      if ((response.err != null)) {
        return callback(response.err);
      } else {
        return callback(null, response.entity);
      }
    });
  } else {
    return $.ajax({
      type: "POST",
      url: config.apiResources.blogCrudAddress(_id, false),
      headers: {
        "Ocean-Auth": window.oceanContext.backServices.crud.oceanAuthHeader
      },
      data: blog
    }).done(function(response) {
      if ((response.err != null)) {
        return callback(response.err);
      } else {
        return callback(null, response.entity);
      }
    });
  }
};

readBlog = function(_id, callback) {
  return $.ajax({
    type: "GET",
    url: config.apiResources.blogCrudAddress(_id, false),
    headers: {
      "Ocean-Auth": window.oceanContext.backServices.crud.oceanAuthHeader
    }
  }).done(function(response) {
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      return callback(null, response.entity);
    }
  });
};

deleteBlog = function(_id, callback) {
  return $.ajax({
    type: "DELETE",
    url: config.apiResources.blogCrudAddress(_id, false),
    headers: {
      "Ocean-Auth": window.oceanContext.backServices.crud.oceanAuthHeader
    }
  }).done(function(response) {
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      return callback();
    }
  });
};

queryBlog = function(criteria, returnColumn, rowDes, callback) {
  var queryData;
  queryData = {
    criteria: criteria,
    returnColumn: returnColumn,
    rowDes: rowDes
  };
  return $.ajax({
    type: "POST",
    url: config.apiResources.blogCrudAddress(null, true),
    contentType: 'application/json; charset=UTF-8',
    headers: {
      "Ocean-Auth": window.oceanContext.backServices.crud.oceanAuthHeader
    },
    dataType: 'json',
    data: JSON.stringify(queryData)
  }).done(function(response) {
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      return callback(null, response.entities);
    }
  });
};

oceanService = {
  registerAccount: registerAccount,
  loginAccount: loginAccount,
  updateAccount: updateAccount,
  fetchOceanContext: fetchOceanContext,
  removeOceanContext: removeOceanContext,
  authWeiboLogin: authWeiboLogin,
  authFacebookLogin: authFacebookLogin,
  saveBlog: saveBlog,
  readBlog: readBlog,
  deleteBlog: deleteBlog,
  queryBlog: queryBlog
};

module.exports = oceanService;

},{"./../config":1}],4:[function(require,module,exports){
// Generated by CoffeeScript 1.9.2
var checkAndRefreshLocalStorage, config, exchangeService, myutils, pageService;

config = require('./../config');

exchangeService = require('./exchange_service');

myutils = require('./../util/myutils');

checkAndRefreshLocalStorage = function(callback) {
  if ((localStorage.getItem('oceanContext') != null)) {
    window.oceanContext = JSON.parse(localStorage.getItem('oceanContext'));
    return callback();
  } else {
    return exchangeService.fetchOceanContext(null, function(err) {
      if ((err != null)) {
        return myutils.showErrorNoticeWindow(err.errorMessage);
      } else {
        return callback();
      }
    });
  }
};

pageService = {
  checkAndRefreshLocalStorage: checkAndRefreshLocalStorage
};

module.exports = pageService;

},{"./../config":1,"./../util/myutils":5,"./exchange_service":3}],5:[function(require,module,exports){
// Generated by CoffeeScript 1.9.2
var oceanUtil, showErrorNoticeWindow, showInfoNoticeWindow, showSuccessNoticeWindow, showWarningNoticeWindow;

showInfoNoticeWindow = function(noticeMessage, timeout) {
  if (timeout == null) {
    timeout = 5000;
  }
  return $.UIkit.notify({
    message: noticeMessage,
    status: 'info',
    timeout: timeout,
    pos: 'top-center'
  });
};

showWarningNoticeWindow = function(noticeMessage) {
  return $.UIkit.notify({
    message: noticeMessage,
    status: 'warning',
    timeout: 5000,
    pos: 'top-center'
  });
};

showErrorNoticeWindow = function(noticeMessage) {
  return $.UIkit.notify({
    message: noticeMessage,
    status: 'danger',
    timeout: 5000,
    pos: 'top-center'
  });
};

showSuccessNoticeWindow = function(noticeMessage) {
  return $.UIkit.notify({
    message: noticeMessage,
    status: 'success',
    timeout: 5000,
    pos: 'top-center'
  });
};

oceanUtil = {
  showInfoNoticeWindow: showInfoNoticeWindow,
  showWarningNoticeWindow: showWarningNoticeWindow,
  showErrorNoticeWindow: showErrorNoticeWindow,
  showSuccessNoticeWindow: showSuccessNoticeWindow
};

module.exports = oceanUtil;

},{}]},{},[2]);
