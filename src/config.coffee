config = {}
config.appKey = 'sample_app'
config.siteAddress = 'http://sample_blog.app.oceanclouds.com'


config.apiResources =
  userRegister:()->
    return window.oceanContext.backServices.user.api + '/register'
  userLogin:()->
    return window.oceanContext.backServices.user.api + '/login'
  userUpdate:()->
    return window.oceanContext.backServices.user.api + '/update'
  getOceanContext:()->
    return 'https://api.oceanclouds.com/v1/app/' + config.appKey + '/getOceanContext'
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

module.exports = config


