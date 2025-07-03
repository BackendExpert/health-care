const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const AppoinmentController = require('../controllers/appoinmentController');

const router = express.Router();

router.post('/create-appoinment', authMiddleware, checkPermission('create-appoinment'), AppoinmentController.createAppoinment)

router.get('/get-doctors', authMiddleware, checkPermission('get-doctors-to-appoinment'), AppoinmentController.getdoctor)

router.get('/all-appoinments', authMiddleware, checkPermission('all-appoinments'), AppoinmentController.getallappoiments)

router.get('/one-appoinment/:id', authMiddleware, checkPermission('one-appoinment'), AppoinmentController.getoneappoinment)

router.get('/my-appoinemts', authMiddleware, checkPermission('my-appoinemts'), AppoinmentController.getmyappoinments)

router.get('/doctor-appoiments', authMiddleware, checkPermission('doctor-appoiments'), AppoinmentController.doctorappoinmets)

module.exports = router;