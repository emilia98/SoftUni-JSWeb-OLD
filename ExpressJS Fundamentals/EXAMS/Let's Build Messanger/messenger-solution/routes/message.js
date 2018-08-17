const router = require('express').Router();
const message = require('../controllers/message');
const isAuth = require('../middlewares/auth').isAuth;

router.post('/send', isAuth, (req, res) => message.sendMessage(req, res));

router.post('/like/:id', isAuth, (req, res) => message.likeMessage(req, res));

module.exports = router;
