const router = require('express').Router();
const exploreUsers = require('../controllers/explore').exploreUsers;
const isAuth = require('../middlewares/auth').isAuth;

router.get('/users', isAuth, (req, res) => exploreUsers(req, res));

module.exports = router;
