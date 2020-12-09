const UserRouter = require('./user');
const RoleRouter = require('./role');
const UserChallengeRouter = require('./userChallenge');
const ChallengeRouter = require('./challenge');
const router = require("express").Router();

router.use('/user', UserRouter);
router.use('/role', RoleRouter);
router.use('/userChallenge', UserChallengeRouter);
router.use('/challenge', ChallengeRouter);

module.exports = router;