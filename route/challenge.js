const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const AuthoMiddleware = require('../middleware/Authorization');
const ChallengeControleur = require('../controleur/challengeDB');

router.get("/", ChallengeControleur.getAllChallenges);
router.patch('/:id',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.updateChallenge);
router.delete('/:id',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.deleteChallenge);
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.addChallenge);

module.exports = router;