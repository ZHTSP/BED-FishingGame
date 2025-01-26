const express = require('express');
const router = express.Router();
const controller = require('../controllers/userrodsController');

router.get('/', controller.readAllUserrods);


module.exports = router;