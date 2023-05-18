import exoress from 'express'
import doctorController from '../controllers/doctorController'

let router = exoress.Router()

router.get('/top-doctor-home', doctorController.getTopDoctorHome)

module.exports = router
