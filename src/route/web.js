import exoress from 'express'
import userController from '../controllers/userController'
import userRouter from './userRouter'
import codeRouter from './codeRouter'

let router = exoress.Router()

let initWebRoutes = (app) => {

    // /api/login
    router.post('/api/login', userController.handleLogin)
    // /api/ms-user
    router.use('/api/ms-user', userRouter)
    // /api/ms/code
    router.use('/api/ms-code', codeRouter)

    return app.use('/', router)
}

module.exports = initWebRoutes