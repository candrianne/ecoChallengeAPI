const UserChallengeControleur = require('../controleur/userChallengeDB');

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', UserChallengeControleur.getAllUserChallenges);

module.exports = router;