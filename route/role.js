const Router = require('express-promise-router');
const router = new Router;
const RoleControleur = require('../controleur/roleDB');

router.get('/login', RoleControleur.login);

module.exports = router;