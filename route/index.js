const UserRouter = require('./user');
const RoleRouter = require('./role');
const UserChallengeRouter = require('./userChallenge');
const ChallengeRouter = require('./challenge');
const AuthoMiddleware = require('../middleware/Authorization');
const router = require("express").Router();
require("dotenv").config();
const process = require("process");

let version = process.env.VERSION;

router.use(`/${version}/user`, UserRouter);
router.use(`/${version}/role`, RoleRouter);
router.use(`/${version}/userChallenge`, UserChallengeRouter);
router.use(`/${version}/challenge`, ChallengeRouter);

module.exports = router;