const express = require('express');
const router = express.Router();
const controller = require('../controllers/rodsController');

router.get('/', controller.readAllRods);
router.post('/purchase/:rod_id', controller.readUserByUsername, controller.readRodById, controller.readUserRodByIdsAndNotBroken, controller.updateSkillpointsById, controller.createNewUserRodRelationship)
router.get('/:rod_id', controller.readRodById);



module.exports = router;


