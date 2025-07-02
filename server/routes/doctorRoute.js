const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.post('/create-doctor', authMiddleware, checkPermission('create-doctor'), doctorController.createDoctor)

module.exports = router;