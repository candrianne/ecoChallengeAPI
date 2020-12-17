const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const FriendshipControleur = require('../controleur/friendshipDB');

router.post('/',JWTMiddleWare.identification, FriendshipControleur.createFriendship);
router.get('/', FriendshipControleur.getFriendship);

module.exports = router;