const express = require('express');
const router = express.Router();
const controller = require('../controllers/backpackController');
router.get('/', controller.readAllBackpack);
router.delete('/:user_id/:fish_id', controller.deleteFishFromBackpack);

module.exports = router;