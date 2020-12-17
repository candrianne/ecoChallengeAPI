const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const AuthoMiddleware = require('../middleware/Authorization');
const ChallengeControleur = require('../controleur/challengeDB');

router.get("/", ChallengeControleur.getAllChallenges);
router.get('/:id', ChallengeControleur.getChallenge);
router.get('/nom/:name', ChallengeControleur.getChallengeIdByName);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.updateChallenge);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.deleteChallenge);
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.addChallenge);

module.exports = router;