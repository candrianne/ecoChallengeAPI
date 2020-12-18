const Router = require('express-promise-router');
const router = new Router;
const RoleControleur = require('../controleur/roleDB');

/**
 * @swagger
 * /role/login:
 *  post:
 *      tags:
 *          - Role
 *      description: renvoie un JWT token permettant l'identification
 *      requestBody:
 *          description: login pour la connexion
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *            description: un token JWT
 *            content:
 *                application/json:
 *                    schema:
 *                      properties:
 *                          jwt:
 *                              type: string
 *          400:
 *              description: email ou password manquant
 *          404:
 *              description: usertype = inconnu
 *          500:
 *              description: Erreur serveur
 */
router.post('/login', RoleControleur.login);

module.exports = router;