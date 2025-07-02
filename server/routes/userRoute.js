const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const checkPermission = require('../middlewares/checkPermissionMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/current-userdata/:email', authMiddleware, checkPermission('get-my-data'), userController.getcurrentuserdata)

module.exports = router;