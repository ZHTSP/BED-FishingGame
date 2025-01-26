const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController');

router.get('/', controller.readAllUsers);
router.post('/', controller.readUserByUsername, controller.createNewUser);
router.put('/:user_id', controller.updateUserById);




module.exports = router;


