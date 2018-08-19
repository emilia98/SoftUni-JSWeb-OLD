const router = require('express').Router();
const isAuth = require('../../middlewares/auth').isAuth;
const addHotelController = require('../../controllers/add');

router.get('/', isAuth, addHotelController.getAddForm);

router.post('/', isAuth, addHotelController.addHotel);

module.exports = router;
