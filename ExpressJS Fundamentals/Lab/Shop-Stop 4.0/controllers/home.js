const Product = require('../models/Product');

module.exports.index = (req, res) => {
  let queryData = req.query;
  let filteringString = queryData.query;

  Product.find({buyer: null}).populate('category')
    .then(products => {
      // CASE-INSENSITIVE SEARCHING
      if (filteringString) {
        filteringString = filteringString.toLowerCase();
        products = products.filter(
          p => p.name.toLowerCase().includes(filteringString)
        );
      }

      let data = { products: products };

      if (req.query.error) {
        data.error = req.query.error;
      } else if (req.query.success) {
        data.success = req.query.success;
      }

      res.render('home/index', data);
    }).catch(err => {
      console.log(err);
    });
};
