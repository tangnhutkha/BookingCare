import exoress from 'express'
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import userRouter from './userRouter'

let router = exoress.Router()

let initWebRoutes = (app) => {

    router.get('/delete-crud', homeController.deleteCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/edit-crud', homeController.editCRUD)
    router.get('/get-crud', homeController.displayCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/crud', homeController.getCRUD)
    router.get('/', homeController.homePage)

    // router.use('/api/ms-user', userRouter)
    router.post('/api/login', userController.handleLogin)
    router.use('/api/ms-user', userRouter)

    return app.use('/', router)
}

module.exports = initWebRoutes