const router = require('express').Router();
const hotelController = require('../../controllers/hotel');
const isAdmin = require('../../middlewares/admin').isAdmin;

router.get('/edit/:id', isAdmin, (req, res) => hotelController.getHotelToEdit(req, res));
router.post('/edit/:id', isAdmin, (req, res) => hotelController.editHotel(req, res));
router.get('/delete/:id', isAdmin, hotelController.deleteHotel);
router.get('/like/:id', hotelController.likeHotel);
router.get('/:id/:title', hotelController.showDetails);

module.exports = router;
