const Product = require('../models/Product');

module.exports.index = (req, res) => {
  console.log(req.query);
  let queryData = req.query;
  let filteringString = queryData.query;

  Product.find()
    .then(products => {
      // CASE-INSENSITIVE SEARCHING
      if (filteringString) {
        filteringString = filteringString.toLowerCase();
        products = products.filter(
          p => p.name.toLowerCase().includes(filteringString)
        );
      }

      res.render('home/index', {
        products: products
      });
    }).catch(err => {
      console.log(err);
    });
};
