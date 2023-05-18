import exoress from 'express'
import doctorController from '../controllers/doctorController'

let router = exoress.Router()

router.get('/top-doctor-home', doctorController.getTopDoctorHome)
router.get('/get-all-doctor', doctorController.getAllDoctors)
router.post('/save-info-doctor', doctorController.postInfoDoctor)

module.exports = router
