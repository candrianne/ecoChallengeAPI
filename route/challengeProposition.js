const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const AuthoMiddleware = require('../middleware/Authorization');
const ChallengePropositionControleur = require('../controleur/challengePropositionDB');

/**
 * @swagger
 * /challengeProposition/:
 *  post:
 *      tags:
 *          - ChallengeProposition
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref : '#/components/requestBodies/CreateChallengeProposition'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserChallengeAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description : Erreur serveur
 */
router.post('/',JWTMiddleWare.identification, ChallengePropositionControleur.createChallengeProposition);
/**
 * @swagger
 * /challengeProposition/:
 *  get:
 *      tags:
 *          - ChallengeProposition
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: un tableau avec tout les propositions de challenge
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/ChallengeProposition'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: proposition non trouvée
 *          500:
 *              description: Erreur serveur
 */
router.get('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengePropositionControleur.getAllChallengePropositions);
/**
 * @swagger
 * /challengeProposition/:
 *  delete:
 *      tags:
 *          - ChallengeProposition
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              description: la proposition est supprimée
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: proposition non trouvée
 *          500:
 *              description: Erreur serveur
 */
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengePropositionControleur.deleteChallengeProposition);
/**
 * @swagger
 * /challengeProposition/nom/{name}:
 *  get:
 *      tags:
 *          - ChallengeProposition
 *      parameters:
 *          - name : name
 *            description: nom d'une proposition de challenge
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: id de la proposition
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: integer
 *
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: proposition non trouvée
 *          500:
 *              description: Erreur serveur
 */
router.get('/nom/:name', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengePropositionControleur.getChallengePropositionIdByName);

module.exports = router;