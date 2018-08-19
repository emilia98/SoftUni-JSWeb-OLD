const router = require('express').Router();
const listController = require('../../controllers/list');

router.get('/', listController.getAllHotels);

module.exports = router;
