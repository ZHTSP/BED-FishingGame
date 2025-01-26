const express = require('express');
const router = express.Router();
const controller = require('../controllers/fishController');

router.get('/', controller.readAllFish);

router.get('/:fish_id', controller.readFishById);


module.exports = router;
