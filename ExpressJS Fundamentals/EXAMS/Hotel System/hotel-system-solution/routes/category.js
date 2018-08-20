const router = require('express').Router();
const categoryController = require('../controllers/category');

router.get(
  '/categories',
  (req, res) => categoryController.getAllCategories(req, res));

module.exports = router;
