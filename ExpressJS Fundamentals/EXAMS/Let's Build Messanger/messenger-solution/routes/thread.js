const router = require('express').Router();
const thread = require('../controllers/thread');
const isAuth = require('../middlewares/auth').isAuth;

router.get('/:username', isAuth, (req, res) => thread.getThread(req, res));
router.post('/:username', isAuth, (req, res) => thread.sendMessage(req, res));

module.exports = router;
