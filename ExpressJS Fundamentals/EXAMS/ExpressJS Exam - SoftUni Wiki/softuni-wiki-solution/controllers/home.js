const Article = require('../models/Article');
const Edit = require('../models/Edit');

async function getHome (req, res) {
  let recentArticles;

  try {
    recentArticles = await Article.find().sort('-creationDate').limit(4);
  } catch (err) {
    console.log(err);
    res.locals.error = 'An error occurred while getting the most recent articles!';
    return res.render('errors/server-error');
  }

  let latestArticle = null;
  if (recentArticles.length > 0) {
    latestArticle = recentArticles.shift();

    let latestArticleEdits;

    try {
      latestArticleEdits = await Edit.find({articleId: latestArticle._id}).sort('-creationDate');
    } catch (err) {
      console.log(err);
      res.locals.error = 'An error occurred while getting edits!';
      return res.render('errors/server-error');
    }

    if (latestArticleEdits.length > 0) {
      let latestEdit = latestArticleEdits.shift();
      let contentToShow = latestEdit.content.split(/\s/g).splice(0, 50);

      res.locals.latestArticle = {
        content: contentToShow.join(' '),
        title: latestArticle.title,
        id: latestArticle._id
      };
    }
  }

  res.locals.recentArticles = recentArticles;
  res.render('index');
}

module.exports = {
  getHome: getHome
};
