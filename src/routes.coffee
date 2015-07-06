index = require('./route/index')
login = require('./route/login')
register = require('./route/register')

routes =
  '/index':()->
    index()
  '/login':()->
    login()
  '/register':()->
    register()


module.exports = routes