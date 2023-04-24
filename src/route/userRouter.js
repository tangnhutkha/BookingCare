import exoress from 'express'
import userController from '../controllers/userController'

let router = exoress.Router()

router.put('/edit', userController.handleEditUser)
router.delete('/delete', userController.handleDeleteUser)
router.post('/create', userController.handleCreateUser)
router.get('/all-users', userController.handleGetAllUsers)

module.exports = router
