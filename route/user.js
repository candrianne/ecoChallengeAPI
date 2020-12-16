const UserControleur = require('../controleur/userDB');
const JWTMiddleWare = require('../middleware/IdentificationJWT');

const Router = require("express-promise-router");
const router = new Router;

router.post('/', UserControleur.inscriptionUser);
router.patch('/', JWTMiddleWare.identification, UserControleur.updateUser);
router.get('/:id', UserControleur.getUserById);
router.get(`/`, JWTMiddleWare.identification);
module.exports = router;