const express = require('express');
const router = express.Router();
const register = require('../controllers/register').register;
const login = require('../controllers/login').login;
const isAnonymous = require('../middlewares/isNotAuth').isAnonymous;
const isAuth = require('../middlewares/auth').isAuth;

router.get('/register', isAnonymous, (req, res) => {
  res.render('auth/register');
});
router.post('/register', isAnonymous, (req, res) => register(req, res));

router.get('/login', isAnonymous, (req, res) => {
  res.render('auth/login');
});
router.post('/login', isAnonymous, (req, res) => login(req, res));

router.get('/logout', isAuth, (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
