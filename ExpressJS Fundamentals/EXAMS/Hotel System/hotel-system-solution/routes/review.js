const router = require('express').Router();
const isAuth = require('../middlewares/auth').isAuth;
const isAdmin = require('../middlewares/admin').isAdmin;
const review = require('../controllers/review');

router.post('/send', isAuth, (req, res) => review.sendReview(req, res));
router.get('/edit/:id', isAdmin, (req, res) => review.getReviewToEdit(req, res));
router.post('/edit/:id', isAdmin, (req, res) => review.editReview(req, res));
router.get('/delete/:id', isAdmin, (req, res) => review.deleteReview(req, res));

module.exports = router;
