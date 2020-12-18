const UserControleur = require('../controleur/userDB');
const JWTMiddleWare = require('../middleware/IdentificationJWT');
const AuthoMiddleware = require('../middleware/Authorization');

const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /user/:
 *  post:
 *      tags:
 *          - User
 *      requestBody:
 *          $ref: '#/components/requestBodies/InscriptionUser'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserInscrit'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          500:
 *              description : Erreur serveur
 *
 *
 */
router.post('/', UserControleur.inscriptionUser);
/**
 * @swagger
 * /user/:
 *  patch:
 *      tags:
 *          - User
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/UserAUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/UserUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Erreur serveur
 */
router.patch('/', JWTMiddleWare.identification, UserControleur.updateUser);
/**
 * @swagger
 * /user/{id}:
 *  get:
 *      tags:
 *          - User
 *      parameters:
 *          - name : id
 *            description: ID d'un user
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/UserFound'
 *          400:
 *              description : id pas valide
 *          404:
 *              description: User non trouvé
 *          500:
 *              description: Erreur serveur
 */
router.get('/:id', UserControleur.getUserById);
/**
 * @swagger
 * /user/:
 *  get:
 *      tags:
 *          - User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: un tableau avec tout les utilisateurs
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: User non trouvé
 *          500:
 *              description: Erreur serveur
 */
router.get(`/`, JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, UserControleur.getAllUsers);
/**
 * @swagger
 * /user/:
 *  delete:
 *      tags:
 *          - User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              description : User supprimé de la DB
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Erreur serveur
 *
 */
router.delete('/', JWTMiddleWare.identification, UserControleur.deleteUser);

module.exports = router;