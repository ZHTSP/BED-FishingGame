const express = require('express');
const router = express.Router();
const controller = require('../controllers/backpackController');
router.get('/', controller.readAllBackpack);

module.exports = router;