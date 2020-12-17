const UserChallengeControleur = require('../controleur/userChallengeDB');
const JWTMiddleWare = require('../middleware/IdentificationJWT');

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', UserChallengeControleur.getAllUserChallenges);
router.patch('/', JWTMiddleWare.identification, UserChallengeControleur.resumeOrPause);
router.post('/', JWTMiddleWare.identification, UserChallengeControleur.addUserChallenge);
router.delete('/', JWTMiddleWare.identification, UserChallengeControleur.deleteUserChallenge);

module.exports = router;