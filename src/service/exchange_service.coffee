$ = window.$
config = require('./../config')
localStorage = window.localStorage

registerAccount = (user, callback)->
  $.ajax({
    type: "POST",
    url: config.apiResources.userRegister()
    headers: {
      "Ocean-Auth":window.oceanContext.backServices.user.oceanAuthHeader
    }
    data: user
  }).done((response)->
    if(response.err?)
      callback(response.err)
    else
      callback()
  )

loginAccount = (user, callback)->
  $.ajax({
    type: "POST",
    url: config.apiResources.userLogin()
    headers: {
      "Ocean-Auth":window.oceanContext.backServices.user.oceanAuthHeader
    }
    data: user
  }).done((response)->
    if(response.err?)
      callback(response.err)
    else
      callback(null, response.entity.accessToken)
  )

updateAccount = (user,callback)->
  user.account = window.oceanContext.userInfo.email
  $.ajax({
    type: "PUT",
    url: config.apiResources.userUpdate()
    headers: {
      "Ocean-Auth":window.oceanContext.backServices.user.oceanAuthHeader
    }
    data: user
  }).done((response)->
    if(response.err?)
      callback(response.err)
    else
      callback(null, response.entity)
  )


fetchOceanContext = (endUserAccessToken, callback)->
  if(endUserAccessToken?)
    url = config.apiResources.getEndUserOceanContext()
  else
    url = config.apiResources.getAnonymousOceanContext()

  $.ajax(
    type: "GET"
    url:url
    headers:
      "AccessToken":endUserAccessToken
  ).done((response)->
    if(response.err?)
      callback(response.err)
    else
      oceanContext = response.entity
      window.oceanContext = oceanContext
      localStorage.removeItem('oceanContext')
      localStorage.setItem('oceanContext', JSON.stringify(oceanContext))
      callback()
  )

removeOceanContext = ()->
  window.oceanContext = {}
  localStorage.removeItem('oceanContext')


authWeiboLogin = (code, callback)->
  $.ajax({
    type: "GET",
    url: config.apiResources.authWeiboLogin(code)
    headers: {
      "Ocean-Auth":window.oceanContext.backServices.weibo.oceanAuthHeader
    }
  }).done((response)->
    if(response.err?)
      callback(response.err)
    else
      callback(null, response.entity?.accessToken)
  )

authFacebookLogin = (code, callback)->
  $.ajax({
    type: "GET",
    url: config.apiResources.authFacebookLogin(code)
    headers: {
      "Ocean-Auth":window.oceanContext.backServices.facebook.oceanAuthHeader
    }
  }).done((response)->
    if(response.err?)
      callback(response.err)
    else
      callback(null, response.entity?.accessToken)
  )

saveBlog = (_id,blog,callback)->
  if(_id? && _id != '')
    $.ajax({
      type: "PUT",
      url: config.apiResources.blogCrudAddress(_id,false)
      headers: {
        "Ocean-Auth":window.oceanContext.backServices.crud.oceanAuthHeader
      }
      data:blog
    }).done((response)->
      if(response.err?)
        callback(response.err)
      else
        callback(null, response.entity)
    )
  else
    $.ajax({
      type: "POST",
      url: config.apiResources.blogCrudAddress(_id,false)
      headers: {
        "Ocean-Auth":window.oceanContext.backServices.crud.oceanAuthHeader
      }
      data:blog
    }).done((response)->
      if(response.err?)
        callback(response.err)
      else
        callback(null, response.entity)
    )

readBlog = (_id,callback)->
  $.ajax({
    type: "GET",
    url: config.apiResources.blogCrudAddress(_id,false)
    headers: {
      "Ocean-Auth":window.oceanContext.backServices.crud.oceanAuthHeader
    }
  }).done((response)->
    if(response.err?)
      callback(response.err)
    else
      callback(null, response.entity)
  )

deleteBlog = (_id,callback)->
  $.ajax({
    type: "DELETE",
    url: config.apiResources.blogCrudAddress(_id,false)
    headers: {
      "Ocean-Auth":window.oceanContext.backServices.crud.oceanAuthHeader
    }
  }).done((response)->
    if(response.err?)
      callback(response.err)
    else
      callback()
  )

queryBlog = (criteria, returnColumn, rowDes, callback)->
  queryData =
    criteria:criteria
    returnColumn:returnColumn
    rowDes:rowDes

  $.ajax({
    type: "POST",
    url: config.apiResources.blogCrudAddress(null,true)
    contentType: 'application/json; charset=UTF-8'
    headers: {
      "Ocean-Auth":window.oceanContext.backServices.crud.oceanAuthHeader
    }
    dataType : 'json'
    data:JSON.stringify(queryData)
  }).done((response)->
    if(response.err?)
      callback(response.err)
    else
      callback(null,response.entities)
  )

oceanService = {
  registerAccount: registerAccount
  loginAccount: loginAccount
  updateAccount:updateAccount
  fetchOceanContext: fetchOceanContext
  removeOceanContext:removeOceanContext
  authWeiboLogin: authWeiboLogin
  authFacebookLogin:authFacebookLogin

  saveBlog:saveBlog
  readBlog:readBlog
  deleteBlog:deleteBlog
  queryBlog:queryBlog
}

module.exports = oceanService
