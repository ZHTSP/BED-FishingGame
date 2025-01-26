const express = require('express');
const router = express.Router();

const challengesRoutes = require('./challengesRoutes');
const usersRoutes = require('./usersRoutes');
const fishRoutes = require('./fishRoutes');
const rodsRoutes = require('./rodsRoutes');
const fishingRoutes = require('./fishingRoutes');
const userrodsRoutes = require('./userrodsRoutes');
const backpackRoutes = require('./backpackRoutes');

router.use("/challenges", challengesRoutes);
router.use("/users",usersRoutes);
router.use("/fish",fishRoutes);
router.use("/rods",rodsRoutes);
router.use("/fishing",fishingRoutes);
router.use("/userrods",userrodsRoutes);
router.use("/backpack",backpackRoutes);

module.exports = router;