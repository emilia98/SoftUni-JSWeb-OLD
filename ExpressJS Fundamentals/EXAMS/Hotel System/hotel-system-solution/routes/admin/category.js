const router = require('express').Router();
const isAdmin = require('../../middlewares/admin').isAdmin;
const Category = require('../../models/Category');

router.get('/', isAdmin, async (req, res) => {
  let categories = await Category.find();
  res.locals.categories = categories;
  res.render('admin/category');
});

router.get('/new', isAdmin, (req, res) => {
  res.render('admin/category-new');
});

router.post('/new', isAdmin, async (req, res) => {
  let title = req.body.title;
  let category;

  if (title.length === 0) {
    res.locals.hasErrors = true;
    res.locals.titleError = 'Title cannot be empty!';
    return res.render('admin/category-new');
  }

  try {
    category = await Category.findOne({ title: title });
  } catch (err) {
    console.log(err);
    res.locals.error = 'Error occurred while creating new category!';
    return res.render('/errors/server-error');
  }

  if (category) {
    res.locals.invalidCategory = true;
    res.locals.errorMsg = 'This category already exists!';
    res.locals.data = req.body;
    return res.render('admin/category-new');
  }

  try {
    await Category.create({
      title: title.toLowerCase()
    });
  } catch (err) {
    console.log(err);
    res.locals.error = 'Error occurred while creating new category!';
    return res.render('/errors/server-error');
  }

  res.redirect('/admin/category');
});

router.get('/delete/:id', async (req, res) => {
  let id = req.params.id;

  let category;

  try {
    category = await Category.findById(id);
  } catch (err) {
    console.log(err);
    res.locals.error = 'Error occurred while deleting a category!';
    return res.render('errors/server-error');
  }

  if (!category) {
    res.locals.error = 'This category does not exist!';
    return res.render('errors/page-not-found'); 
  }

  await category.remove();
  res.redirect('/admin/category');
});

module.exports = router;
