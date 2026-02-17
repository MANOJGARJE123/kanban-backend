const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');


router.post("/regsiter", authController.register);
router.post("/login", authController.login);

module.exports = router;