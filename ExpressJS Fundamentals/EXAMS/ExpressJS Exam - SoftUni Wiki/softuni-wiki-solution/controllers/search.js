const Article = require('../models/Article');

async function searchArticles (req, res) {
  let title = req.query.title;
  let articles;

  try {
    articles = await Article.find({ title: { $regex: new RegExp(title, 'i') } });
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting maching articles!';
    return res.render('errors/server-error');
  }

  res.locals.results = articles;
  res.locals.search = title;
  res.render('article/search');
}

module.exports.searchArticles = searchArticles;
