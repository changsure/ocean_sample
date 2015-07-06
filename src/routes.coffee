index = require('./route/index')
oauth = require('./route/oauth')
login = require('./route/login')
register = require('./route/register')

routes =
  '/index':()->
    index()
  '/login':()->
    login()
  '/register':()->
    register()
  '/oauth':()->
    oauth()


module.exports = routes