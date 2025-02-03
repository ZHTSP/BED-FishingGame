const express = require('express');
const router = express.Router();
const controller = require('../controllers/challengesController');

router.post('/', controller.createNewChallenges)
router.get('/', controller.readAllChallenges)
router.put('/:challenge_id', controller.readChallengeById, controller.updateChallengeById)
router.delete('/:challenge_id', controller.deleteChallengeById, controller.removeChallengeFromCompletion, controller.removeChallenge)
router.post('/:challenge_id', controller.readChallengeById, controller.readUserById, controller.updateUserSkillpointsById, controller.createNewCompletion)
router.get('/:challenge_id', controller.readCompleteRecordByChallengeId)
    
module.exports = router;

