const router = require('express').Router();
const homeController = require('../controllers/home');

router.get('/', (req, res) => homeController.getLatestHotels(req, res));

module.exports = router;
