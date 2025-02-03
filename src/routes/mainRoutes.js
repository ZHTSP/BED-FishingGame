const express = require('express');
const router = express.Router();

const challengesRoutes = require('./challengesRoutes');
const usersRoutes = require('./usersRoutes');
const fishRoutes = require('./fishRoutes');
const rodsRoutes = require('./rodsRoutes');
const fishingRoutes = require('./fishingRoutes');
const userrodsRoutes = require('./userrodsRoutes');
const backpackRoutes = require('./backpackRoutes');
const reviewRoutes = require('./reviewRoutes');


const usersController = require('../controllers/usersController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
router.post("/login", usersController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken, jwtMiddleware.verifyToken);
router.post("/register", usersController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, usersController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.use("/review", reviewRoutes);
router.use("/challenges", challengesRoutes);
router.use("/users",usersRoutes);
router.use("/fish",fishRoutes);
router.use("/rods",rodsRoutes);
router.use("/fishing",fishingRoutes);
router.use("/userrods",userrodsRoutes);
router.use("/backpack",backpackRoutes);

module.exports = router;