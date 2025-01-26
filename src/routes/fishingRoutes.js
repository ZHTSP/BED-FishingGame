const express = require('express');
const router = express.Router();
const controller = require('../controllers/fishingController');

router.post('/:user_id/:rod_id', controller.readUserRodByIdsAndNotBroken,controller.catchfish,controller.updateDurabilityById, controller.storeFish);

module.exports = router;