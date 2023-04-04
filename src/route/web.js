import exoress from 'express'
import homeController from '../controllers/homeController'

let router = exoress.Router()

let initWebRoutes = (app) => {

    router.get('/delete-crud', homeController.deleteCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/edit-crud', homeController.editCRUD)
    router.get('/get-crud', homeController.displayCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/crud', homeController.getCRUD)
    router.get('/', homeController.homePage)

    return app.use('/', router)
}

module.exports = initWebRoutes