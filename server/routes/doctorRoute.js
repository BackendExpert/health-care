const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.post('/create-doctor', authMiddleware, checkPermission('create-doctor'), doctorController.createDoctor)

router.get('/all-doctors', authMiddleware, checkPermission('get-alldoctors'), doctorController.getalldoctors)

router.get('/view-doctor/:id', authMiddleware, checkPermission('view-doctor'), doctorController.viewdoctorbyid)

router.get('/mypatients', authMiddleware, checkPermission('my-patients-doctor'), doctorController.mypatients)

module.exports = router;