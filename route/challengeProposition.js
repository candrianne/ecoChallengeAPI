const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const AuthoMiddleware = require('../middleware/Authorization');
const ChallengePropositionControleur = require('../controleur/challengePropositionDB');

router.post('/',JWTMiddleWare.identification, ChallengePropositionControleur.createChallengeProposition);
router.get('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengePropositionControleur.getAllChallengePropositions);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengePropositionControleur.deleteChallengeProposition);

module.exports = router;