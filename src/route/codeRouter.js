import exoress from 'express'
import userController from '../controllers/codeController'

let router = exoress.Router()

router.get('/allcode', userController.handleGetAllCodes)

module.exports = router
