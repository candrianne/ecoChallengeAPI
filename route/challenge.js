const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const ChallengeControleur = require('../controleur/challengeDB');

router.get("/", ChallengeControleur.getAllChallenges);

module.exports = router;