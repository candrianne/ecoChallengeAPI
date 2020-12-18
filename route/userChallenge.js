const UserChallengeControleur = require('../controleur/userChallengeDB');
const JWTMiddleWare = require('../middleware/IdentificationJWT');

const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /userChallenge/{id}:
 *  get:
 *      tags:
 *          - UserChallenge
 *      parameters:
 *          - name : id
 *            description: ID d'un userChallenge
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: un tableau avec tout les utilisateurs
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/UserChallenge'
 *          400:
 *              description : id pas valide
 *          404:
 *              description: pas de challenge trouvé avec l'id spécifié
 *          500:
 *              description: Erreur serveur
 */
router.get('/:id', UserChallengeControleur.getAllUserChallenges);
/**
 * @swagger
 * /userChallenge/:
 *  patch:
 *      tags:
 *          - UserChallenge
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/UserChallengePauseOrUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/UserChallengeUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: l'utilisateur ne participe pas à ce challenge
 *          500:
 *              description: Erreur serveur
 */
router.patch('/', JWTMiddleWare.identification, UserChallengeControleur.resumeOrPause);
/**
 * @swagger
 * /userChallenge/:
 *  post:
 *      tags:
 *          - UserChallenge
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref : '#/components/requestBodies/UserChallengeUpdateOrDelete'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserChallengeAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description : le challenge spécifié n'existe pas
 *          500:
 *              description : Erreur serveur
 */
router.post('/', JWTMiddleWare.identification, UserChallengeControleur.addUserChallenge);
/**
 * @swagger
 * /userChallenge/:
 *  delete:
 *      tags:
 *          - UserChallenge
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              description : User supprimé de la DB
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: l'utilisateur ne participe pas à ce challenge
 *          500:
 *              description: Erreur serveur
 *
 */
router.delete('/', JWTMiddleWare.identification, UserChallengeControleur.deleteUserChallenge);

module.exports = router;