const Product = require('../models/Product');
const Category = require('../models/Category');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const path = require('path');
const fs = require('fs');

module.exports.addGet = (req, res) => {
  Category.find()
    .then(categories => {
      res.render('product/add', {
        categories: categories
      });
    }).catch(err => {
      console.log(err);
    });
};

module.exports.addPost = (req, res) => {
  let product = req.body;
  product.image = '\\' + req.file.path;
  product.creator = req.user._id;

  let categoryId = product.category;

  Product.create(product)
    .then((createdProduct) => {
      Category.findById(categoryId).then(category => {
        category.products.push(createdProduct._id);
        category.save();

        res.redirect('/');
      }).catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.deleteGet = async (req, res) => {
  let id = req.params.id;
  let foundProduct;

  try {
    foundProduct = await Product.findById(id);
  } catch (err) {
    if (err) {
      res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    }
  }

  if (!foundProduct) {
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    return;
  }

  if (!foundProduct.creator.equals(req.user._id) && !req.user.roles.includes('Admin')) {
    res.render('forbidden');
    return;
  }

  if (foundProduct.buyer) {
    res.redirect(`/?error=${encodeURIComponent('Product has been bought!')}`);
    return;
  }

  res.render('product/delete', {
    product: foundProduct
  });
};

module.exports.deletePost = async (req, res) => {
  let id = req.params.id;
  let foundProduct = await Product.findById(id);

  if (!foundProduct) {
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    return;
  }

  if (!foundProduct.creator.equals(req.user._id) && !req.user.roles.includes('Admin')) {
    res.render('forbidden');
    return;
  }

  if (foundProduct.buyer) {
    res.redirect(`/?error=${encodeURIComponent('Product has been bought!')}`);
    return;
  }

  let categoryId = foundProduct.category;
  let imageSrc = foundProduct.image;

  try {
    let category = await Category.findById(categoryId).populate('products');

    for (let i = 0; i < category.products.length; i++) {
      let el = category.products[i];
      if (el._id) {
        category.products.splice(i, 1);
        break;
      }
    }

    let imagePath = path.normalize(
      path.join(__dirname, '../', imageSrc)
    );

    await (function () {
      return new Promise((resolve, reject) => {

        fs.unlink(imagePath, (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(data);
        });
      });
    })();

    await category.save();
    await foundProduct.remove();
    res.redirect(`/?success=${encodeURIComponent('Product was deleted successfully!')}`);
  } catch (err) {
    res.send('<h1>Something went wrong!</h1>');
  }
};

module.exports.editGet = async (req, res) => {
  let id = req.params.id;
  let foundProduct;
  try {
    foundProduct = await Product.findById(id);
  } catch (err) {
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    return;
  }

  if (!foundProduct) {
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    return;
  }

  if (!foundProduct.creator.equals(req.user._id) && !req.user.roles.includes('Admin')) {
    res.render('forbidden');
    return;
  }

  if (foundProduct.buyer) {
    res.redirect(`/?error=${encodeURIComponent('Product has been bought!')}`);
    return;
  }

  let categories = await Category.find();

  res.render('product/edit', {
    product: foundProduct,
    categories: categories
  });
};

module.exports.editPost = async (req, res) => {
  let id = req.params.id;
  let editedProduct = req.body;
  let product;

  try {
    product = await Product.findById(id);
  } catch (err) {
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    return;
  }

  if (!product) {
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    return;
  }

  if (!product.creator.equals(req.user._id) && !req.user.roles.includes('Admin')) {
    res.render('forbidden');
    return;
  }

  if (product.buyer) {
    res.redirect(`/?error=${encodeURIComponent('Product has been bought!')}`);
    return;
  }
  product.name = editedProduct.name;
  product.description = editedProduct.description;
  product.price = editedProduct.price;

  /* - If we've uploaded a new image, we will store it
     - If we haven't, we won't.
  */
  if (req.file) {
    product.image = '\\' + req.file.path;
  }

  if (product.category.toString() !== editedProduct.category) {
    let toRemoveId = product.category;
    let categoryToEdit = await Category.findById(toRemoveId);
    let productIndex = categoryToEdit.products.indexOf(product._id);

    if (productIndex > -1) {
      categoryToEdit.products.splice(productIndex, 1);
    }

    // save the category, from which we removed the product
    await categoryToEdit.save();

    let categoryToAddProduct;

    try {
      categoryToAddProduct = await Category.findById(editedProduct.category);
    } catch (err) {
      res.redirect(`/?error=${encodeURIComponent('Category does not exist!')}`);
      return;
    }

    categoryToAddProduct.products.push(product._id);
    // save the new category, where we added the product
    await categoryToAddProduct.save();

    product.category = editedProduct.category;
    await product.save();

    res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
  } else {
    await product.save();
    res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
  }
};

module.exports.buyGet = async (req, res) => {
  let id = req.params.id;
  let product;

  try {
    product = await Product.findById(id);
  } catch (err) {
    res.redirect(`/?error=${encodeURIComponent('Product does not exist!')}`);
    return;
  }

  if (!product) {
    res.redirect(`/?error=${encodeURIComponent('Product does not exist!')}`);
    return;
  }
  res.render('product/buy', {
    product: product
  });
};

module.exports.buyPost = async (req, res) => {
  let id = req.params.id;
  let product;

  try {
    product = await Product.findById(id);
  } catch (err) {
    res.redirect(`/?error=${encodeURIComponent('Product does not exist!')}`);
    return;
  }

  if (!product) {
    res.redirect(`/?error=${encodeURIComponent('Product does not exist!')}`);
    return;
  }

  if (product.buyer) {
    res.redirect(`/?error=${encodeURIComponent('The product is already bought!')}`);
    return;
  }

  product.buyer = req.user._id;
  await product.save();

  req.user.boughtProducts.push(product._id);
  await req.user.save();
  res.redirect('/');
};
