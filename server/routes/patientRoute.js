const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const PatientController = require('../controllers/patientController');

const router = express.Router();

router.get('/get-allpatients', authMiddleware, checkPermission('get-all-patients'), PatientController.getallpatients)

router.get('/get-patientbyid/:id', authMiddleware, checkPermission('get-patientbyid'), PatientController.getPatientbyID)



module.exports = router;