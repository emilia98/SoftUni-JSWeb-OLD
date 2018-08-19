const router = require('express').Router();
const hotelController = require('../../controllers/hotel');

router.get('/like/:id', hotelController.likeHotel);
router.get('/:id/:title', hotelController.showDetails);

module.exports = router;
