Vue = require('vue')
$ = window.$
config = require('../config')
exchangeService = require('./../service/exchange_service')
myutils = require('./../util/myutils')

RegisterVue = Vue.extend({
  template: require('../template/register.html')
  methods:
    signUp: ()->
      this.validEmail()
      this.validPassword()
      this.validRepeatPassword()
      this.validNickName()

      if(this.validEmail() && this.validPassword() && this.validRepeatPassword() && this.validNickName())
        registerUser =
          accountName: this.$data.email
          password: this.$data.password
          displayName: this.$data.displayName
          email: this.$data.email

        exchangeService.registerAccount(registerUser, (err)->
          if(err?)
            if(err.errCode == 'user.alreadyExist')
              $("form[name='register_form'] input[name='email']").addClass("uk-form-danger")
              $("form[name='register_form'] [name='emailMessage']").html("Email already exist, please choose another one or sign in by your former email !")
            else
              myutils.showErrorNoticeWindow(err.errorMessage)
          else
            myutils.showInfoNoticeWindow('Sign up success! Refreshing to index page!')
            window.setTimeout(()->
              window.location = config.siteAddress
            ,2000)

        )

    validEmail: ()->
      emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if(!this.$data.email? || this.$data.email == '')
        $("form[name='register_form'] input[name='email']").addClass("uk-form-danger")
        $("form[name='register_form'] [name='emailMessage']").html("Email is required!")
        return false
      else if(!emailReg.test(this.$data.email))
        $("form[name='register_form'] input[name='email']").addClass("uk-form-danger")
        $("form[name='register_form'] [name='emailMessage']").html("Email format is not right!")
        return false
      else
        $("form[name='register_form'] input[name='email']").removeClass("uk-form-danger")
        $("form[name='register_form'] [name='emailMessage']").empty()
        return true

    validPassword: ()->
      this.validRepeatPassword()

      if(!this.$data.password? || this.$data.password == '')
        $("form[name='register_form'] input[name='password']").addClass("uk-form-danger")
        $("form[name='register_form'] [name='passwordMessage']").html("Password is required!")
        return false
      else if(this.$data.password.length < 6)
        $("form[name='register_form'] input[name='password']").addClass("uk-form-danger")
        $("form[name='register_form'] [name='passwordMessage']").html("Password must be more than 6 character!")
        return false
      else
        $("form[name='register_form'] input[name='password']").removeClass("uk-form-danger")
        $("form[name='register_form'] [name='passwordMessage']").empty()
        return true

    validRepeatPassword: ()->
      if(this.$data.password != this.$data.passwordRepeat)
        $("form[name='register_form'] input[name='password_repeat']").addClass("uk-form-danger")
        $("form[name='register_form'] [name='repeatPasswordMessage']").html("Repeat password must be the same with password!")
        return false
      else
        $("form[name='register_form'] input[name='password_repeat']").removeClass("uk-form-danger")
        $("form[name='register_form'] [name='repeatPasswordMessage']").empty()
        return true

    validNickName: ()->
      if(!this.$data.displayName? || this.$data.displayName == '')
        $("form[name='register_form'] input[name='nickname']").addClass("uk-form-danger")
        $("form[name='register_form'] [name='displayNameMessage']").html("Nick name is required!")
        return false
      else if(this.$data.displayName.length < 4)
        $("form[name='register_form'] input[name='nickname']").addClass("uk-form-danger")
        $("form[name='register_form'] [name='displayNameMessage']").html("Nick name must be more than 4 character!")
        return false
      else
        $("form[name='register_form'] input[name='nickname']").removeClass("uk-form-danger")
        $("form[name='register_form'] [name='displayNameMessage']").empty()
        return true

})


module.exports = RegisterVue