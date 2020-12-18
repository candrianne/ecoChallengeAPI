const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const AuthoMiddleware = require('../middleware/Authorization');
const ChallengeControleur = require('../controleur/challengeDB');

/**
 * @swagger
 * /challenge/:
 *  get:
 *      tags:
 *          - Challenge
 *      responses:
 *          200:
 *              description: un tableau avec tout les challenges
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ChallengeAdapted'
 *          404:
 *              description: pas de challenge trouvé
 *          500:
 *              description: Erreur serveur
 */
router.get("/", ChallengeControleur.getAllChallenges);
/**
 * @swagger
 * /challenge/{id}:
 *  get:
 *      tags:
 *          - Challenge
 *      parameters:
 *          - name : id
 *            description: ID d'un Challenge
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: le challenge
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/Challenge'
 *          400:
 *              description : id pas valide
 *          404:
 *              description: pas de challenge trouvé avec l'id spécifié
 *          500:
 *              description: Erreur serveur
 */
router.get('/:id', ChallengeControleur.getChallenge);
/**
 * @swagger
 * /challenge/nom/{name}:
 *  get:
 *      tags:
 *          - Challenge
 *      parameters:
 *          - name : name
 *            description: nom d'un challenge
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: id du challenge
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
 *              description: challenge non trouvée
 *          500:
 *              description: Erreur serveur
 */
router.get('/nom/:name', ChallengeControleur.getChallengeIdByName);
/**
 * @swagger
 * /challenge/:
 *  patch:
 *      tags:
 *          - Challenge
 *      security:
 *          - bearerAuth: []
 *      requestBody :
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref : '#/components/schemas/ChallengeUpdate'
 *      responses:
 *          204:
 *              description: challenge modifié
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: challenge non trouvé
 *          500:
 *              description: Erreur serveur
 */
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.updateChallenge);
/**
 * @swagger
 * /challenge/:
 *  delete:
 *      tags:
 *          - Challenge
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              description: challengeSupprimé
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: challenge non trouvé
 *          500:
 *              description: Erreur serveur
 */
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.deleteChallenge);
/**
 * @swagger
 * /challenge/:
 *  post:
 *      tags:
 *          - Challenge
 *      security:
 *          - bearerAuth: []
 *
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref : '#/components/schemas/ChallengeCreate'
 *      responses:
 *          201:
 *              description: challenge ajouté
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description : Erreur serveur
 */
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ChallengeControleur.addChallenge);

module.exports = router;