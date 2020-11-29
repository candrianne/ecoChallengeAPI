const UserControleur = require('../controleur/userDB');
//const JWTMiddleWare = require('../middleware/IdentificationJWT');

const Router = require("express-promise-router");
const router = new Router;

router.post('/', UserControleur.inscriptionUser);
router.get('/:email',UserControleur.getUser);
//router.patch('/', JWTMiddleWare.identification, UserControleur.updateUser);

module.exports = router;    