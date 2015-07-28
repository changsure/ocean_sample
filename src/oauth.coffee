$ = window.$
config = require('./config')
oceanService = require('./service/exchange_service')
pageService =require('./service/page_service')

$(document).ready(()->
  pageService.checkAndRefreshLocalStorage(()->
    type = getUrlParam('type')
    if(type=='weibo')
      code = getUrlParam('code')
      error = getUrlParam('error')
      if(error? && error != '')
        alert('Login failed!')
        window.close()
      else
        oceanService.authWeiboLogin(code,(err,accessToken)->
          if(err?)
            alert(JSON.stringify(err))
          else
            oceanService.fetchOceanContext(accessToken,(err)->
              if(err?)
                alert(JSON.stringify(err))
              else
                window.opener.location = config.siteAddress
                window.close()
            )
        )
    else if(type=='facebook')
      code = getUrlParam('code')
      error = getUrlParam('error')
      if(error? && error != '')
        window.close()
      else
        oceanService.authFacebookLogin(code,(err,accessToken)->
          if(err?)
            alert('Login Failed!')
            console.log(JSON.stringify(err))
          else
            oceanService.fetchOceanContext(accessToken,(err)->
              if(err?)
                alert('Login Failed!')
                console.log(JSON.stringify(err))
              else
                window.opener.location = config.siteAddress
                window.close()
            )
        )
    else
      alert('No support 3rd type!')
  )
)

getUrlParam = (name)->
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  r = window.location.search.substr(1).match(reg)
  if (r!=null)
    return unescape(r[2]);
  return null;