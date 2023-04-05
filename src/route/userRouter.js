import exoress from 'express'
import userController from '../controllers/userController'

let router = exoress.Router()

router.get('/login', userController.login)

module.exports = router
