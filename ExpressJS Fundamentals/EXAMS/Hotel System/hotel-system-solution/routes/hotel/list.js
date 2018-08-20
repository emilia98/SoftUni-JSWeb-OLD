const router = require('express').Router();
const listController = require('../../controllers/list');

router.get('/', listController.getAllHotels);

router.get('/category/:title', (req, res) => listController.getHotelsByCategory(req, res));
module.exports = router;
