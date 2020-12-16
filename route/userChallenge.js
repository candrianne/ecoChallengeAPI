const UserChallengeControleur = require('../controleur/userChallengeDB');
const JWTMiddleWare = require('../middleware/IdentificationJWT');

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', UserChallengeControleur.getAllUserChallenges);
router.patch('', JWTMiddleWare.identification, UserChallengeControleur.resumeOrPause);

module.exports = router;