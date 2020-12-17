const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;
const FriendRequestControleur = require('../controleur/friendRequestDB');

router.post('/',JWTMiddleWare.identification, FriendRequestControleur.createFriendRequest);
router.delete('/',JWTMiddleWare.identification, FriendRequestControleur.deleteFriendRequest);

module.exports = router;