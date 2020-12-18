const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const FriendRequestControleur = require('../controleur/friendRequestDB');

/**
 * @swagger
 * /friendRequest/:
 *  post:
 *      tags:
 *          - FriendRequest
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          receiverId:
 *                              type: integer
 *                      required:
 *                          - receiverId
 *      responses:
 *          201:
 *              $ref: '#/components/responses/FriendRequestCreated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description : l'utilisateur auquel on veut envoyer une demande n'existe pas
 *          500:
 *              description : Erreur serveur
 */
router.post('/',JWTMiddleWare.identification, FriendRequestControleur.createFriendRequest);
/**
 * @swagger
 * /friendRequest/:
 *  delete:
 *      tags:
 *          - FriendRequest
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              description : demande d'ami supprimée de la DB
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description : la demande d'ami n'existe pas
 *          500:
 *              description : Erreur serveur

 */
router.delete('/',JWTMiddleWare.identification, FriendRequestControleur.deleteFriendRequest);

module.exports = router;