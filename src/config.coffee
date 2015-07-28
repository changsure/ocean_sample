config = {}
config.appKey = 'sample_app'
config.siteAddress = 'http://sampleblog.app.oceanclouds.com/'


config.apiResources =
  userRegister:()->
    return window.oceanContext.backServices.user.api + '/register'
  userLogin:()->
    return window.oceanContext.backServices.user.api + '/login'
  userUpdate:()->
    return window.oceanContext.backServices.user.api + '/update'
  getAnonymousOceanContext:(endUserAccessToken)->
    return 'https://api.oceanclouds.com/v1.0/public/ocean_context/' + config.appKey
  getEndUserOceanContext:()->
    return 'https://api.oceanclouds.com/v1.0/end/ocean_context/' + config.appKey
  authWeiboLogin:(code)->
    return window.oceanContext.backServices.weibo.api + '/authwb/' + config.appKey + '/auth' + '?code=' + code
  authFacebookLogin:(code)->
    return window.oceanContext.backServices.facebook.api + '/authfb/' + config.appKey + '/auth' + '?code=' + code
  blogCrudAddress:(_id,isQuery)->
    if(_id?)
      return window.oceanContext.backServices.crud.api + '/' + config.appKey + '/blog/' + _id
    else if(isQuery)
      return window.oceanContext.backServices.crud.api + '/' + config.appKey + '/blog/find/query'
    else
      return window.oceanContext.backServices.crud.api + '/' + config.appKey + '/blog'
config.domIds =
  mainHeader:'#main_header'
  mainContent:'#main_content'
  blogsVue:
    blogContentWindow:"#blog_content_window"
    blogContentContainer:"#blog_content_container"


module.exports = config


