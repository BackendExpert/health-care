const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/AuthMiddleware')
const checkPermission = require('../middlewares/checkPermissionMiddleware');

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

router.post('/create-permission', authMiddleware, checkPermission('create-role-permission'), authController.createPermissions)

router.get('/view-all-role', authMiddleware, checkPermission('view-role-permission'), authController.getallrolesWithPermissions)

router.get('/view-one-role/:id', authMiddleware, checkPermission('view-one-role-permission'), authController.viewoneROleWithPermissions)

router.post('/delete-role-permission', authMiddleware, checkPermission('delete-role-permission'), authController.deleteRolePermission)

module.exports = router;