const router = require('express').Router();
const users = require('../controllers/users');
const isAuth = require('../middlewares/auth').isAuth;

router.post('/block/:id', isAuth, (req, res) => users.blockUser(req, res));

module.exports = router;
