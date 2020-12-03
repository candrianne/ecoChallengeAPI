const UserRouter = require('./user');
const RoleRouter = require('./role');
const UserChallengeRouter = require('./userChallenge');
const router = require("express").Router();

router.use('/user', UserRouter);
router.use('/role', RoleRouter);
router.use('/userChallenge', UserChallengeRouter);

module.exports = router;