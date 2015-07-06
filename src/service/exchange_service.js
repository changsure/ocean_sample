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
      return callback(null, response.entity.appUserAccessCode);
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

fetchOceanContext = function(accessCode, callback) {
  return $.ajax({
    type: "POST",
    url: config.apiResources.getOceanContext(),
    data: {
      accessCode: accessCode
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
    var appUserInfo;
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      appUserInfo = response.entity;
      return callback(null, appUserInfo);
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
    var appUserInfo;
    if ((response.err != null)) {
      return callback(response.err);
    } else {
      appUserInfo = response.entity;
      return callback(null, appUserInfo);
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
