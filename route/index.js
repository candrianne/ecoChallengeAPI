const UserRouter = require('./user');
const RoleRouter = require('./role');
const router = require("express").Router();

router.use('/user', UserRouter);
router.use('/role', RoleRouter);

module.exports = router;