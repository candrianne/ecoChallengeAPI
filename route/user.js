const UserControleur = require('../controleur/userDB');
const JWTMiddleWare = require('../middleware/IdentificationJWT');
const AuthoMiddleware = require('../middleware/Authorization');

const Router = require("express-promise-router");
const router = new Router;

router.post('/', UserControleur.inscriptionUser);
router.patch('/', JWTMiddleWare.identification, UserControleur.updateUser);
router.get('/:id', UserControleur.getUserById);
router.get(`/`, JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, UserControleur.getAllUsers);
router.delete('/', JWTMiddleWare.identification, UserControleur.deleteUser);
module.exports = router;