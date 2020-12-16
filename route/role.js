const Router = require('express-promise-router');
const router = new Router;
const RoleControleur = require('../controleur/roleDB');

router.post('/login', RoleControleur.login);

module.exports = router;