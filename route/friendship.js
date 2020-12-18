const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const FriendshipControleur = require('../controleur/friendshipDB');

/**
 * @swagger
 * /friendship/:
 *  post:
 *      tags:
 *          - Friendship
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idNewFriend:
 *                              type: integer
 *                      required:
 *                          - idNewFriend
 *      responses:
 *          201:
 *              $ref: '#/components/responses/FriendshipAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description : la demande d'ami n'a pas été envoyée
 *          500:
 *              description : Erreur serveur
 */
router.post('/',JWTMiddleWare.identification, FriendshipControleur.createFriendship);
/**
 * @swagger
 * /friendship/:
 *  get:
 *      tags:
 *          - Friendship
 *      parameters:
 *          - name : idUser1
 *            description: ID d'un utilisateur
 *            in: query
 *            required: true
 *            schema:
 *              type: integer
 *          - name : idUser2
 *            description: ID d'un utilisateur
 *            in: query
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: un tableau avec tout les utilisateurs
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Friendship'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: pas d"amitié trouvée
 *          500:
 *              description: Erreur serveur
 */
router.get('/', FriendshipControleur.getFriendship);
/**
 * @swagger
 * /friendship/all:
 *  get:
 *      tags:
 *          - Friendship
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: un tableau avec toutes les amitiés d'un utilisateur
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Friendship'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description:  l'utilisateur n'a pas d'amis
 *          500:
 *              description: Erreur serveur
 */
router.get('/all', JWTMiddleWare.identification, FriendshipControleur.getAllUserFriendships);
/**
 * @swagger
 * /friendship/:
 *  delete:
 *      tags:
 *          - Friendship
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              description : friendship supprimée de la DB
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: l'amitié n'existe pas
 *          500:
 *              description: Erreur serveur
 *
 */
router.delete('/', JWTMiddleWare.identification, FriendshipControleur.deleteFriendship);

module.exports = router;