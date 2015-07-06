Vue = require('vue')
$ = window.$
config = require('../config')
exchangeService = require('./../service/exchange_service')
myutils = require('./../util/myutils')


LoginVue = Vue.extend({
  template: require('../template/login.html')
  methods:
    signIn:()->
      if(!this.$data.email? || !this.$data.password?)
        $("form[name='login_form'] [name='loginMessage']").html('Required email and password!')
      else
        loginUser =
          accountName:this.$data.email
          password:this.$data.password
          rememberMe:this.$data.rememberMe
        exchangeService.loginAccount(loginUser,(err,appUserAccessCode)->
          if(err?)
            $("form[name='login_form'] [name='loginMessage']").html(err.errorMessage)
          else
            exchangeService.fetchOceanContext(appUserAccessCode,(err)->
              if(err?)
                myutils.showErrorNoticeWindow(err.errorMessage)
              else
                myutils.showInfoNoticeWindow('Login success!')
                window.setTimeout(()->
                  window.location = config.siteAddress
                ,2000)
            )
        )

    loginWeibo:()->
      iWidth=770 #弹出窗口的宽度
      iHeight=450 #弹出窗口的高度
      iTop = (window.screen.availHeight-30-iHeight)/2 #获得窗口的垂直位置;
      iLeft = (window.screen.availWidth-10-iWidth)/2 #获得窗口的水平位置;
      weibologin = window.open('https://api.weibo.com/oauth2/authorize?client_id=4266830700&response_type=code&redirect_uri=http://mypenpal.info/oauth/oauth.html?type=weibo&func=auth', 'WeiboLogin', 'height='+iHeight+',innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no')
    loginFb:()->
      iWidth=550 #弹出窗口的宽度
      iHeight=300 #弹出窗口的高度
      iTop = (window.screen.availHeight-30-iHeight)/2 #获得窗口的垂直位置;
      iLeft = (window.screen.availWidth-10-iWidth)/2 #获得窗口的水平位置;
      weibologin = window.open('https://www.facebook.com/dialog/oauth?client_id=1684431935118796&display=popup&redirect_uri=http://mypenpal.info/oauth/oauth.html?type=facebook', 'WeiboLogin', 'height='+iHeight+',innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no')

})

module.exports = LoginVue