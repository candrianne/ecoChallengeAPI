const UserRouter = require('./user');
const RoleRouter = require('./role');
const UserChallengeRouter = require('./userChallenge');
const ChallengeRouter = require('./challenge');
const FriendRequestRouter = require('./friendRequest');
const FriendshipRouter = require('./friendship');
const router = require("express").Router();
require("dotenv").config();
const process = require("process");

let version = process.env.VERSION;

router.use(`/${version}/user`, UserRouter);
router.use(`/${version}/role`, RoleRouter);
router.use(`/${version}/userChallenge`, UserChallengeRouter);
router.use(`/${version}/challenge`, ChallengeRouter);
router.use(`/${version}/friendRequest`, FriendRequestRouter);

module.exports = router;