import exoress from 'express'
import homeController from '../controllers/homeController'

let router = exoress.Router()

let initWebRoutes = (app) => {

    router.get('/', homeController.homePage)
    return app.use('/', router)
}

module.exports = initWebRoutes