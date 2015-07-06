
showInfoNoticeWindow = (noticeMessage,timeout)->
  if(!timeout?)
    timeout = 5000
  $.UIkit.notify(
    message : noticeMessage,
    status  : 'info',
    timeout : timeout,
    pos     : 'top-center'
  )

showWarningNoticeWindow = (noticeMessage)->
  $.UIkit.notify(
    message : noticeMessage,
    status  : 'warning',
    timeout : 5000,
    pos     : 'top-center'
  )

showErrorNoticeWindow = (noticeMessage)->
  $.UIkit.notify(
    message : noticeMessage,
    status  : 'danger',
    timeout : 5000,
    pos     : 'top-center'
  )

showSuccessNoticeWindow = (noticeMessage)->
  $.UIkit.notify(
    message : noticeMessage,
    status  : 'success',
    timeout : 5000,
    pos     : 'top-center'
  )

oceanUtil = {
  showInfoNoticeWindow: showInfoNoticeWindow
  showWarningNoticeWindow:showWarningNoticeWindow
  showErrorNoticeWindow:showErrorNoticeWindow
  showSuccessNoticeWindow:showSuccessNoticeWindow
}

module.exports = oceanUtil