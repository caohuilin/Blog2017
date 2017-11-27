const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('article', '/article/:id/:path')
routes.add('index', '/')
