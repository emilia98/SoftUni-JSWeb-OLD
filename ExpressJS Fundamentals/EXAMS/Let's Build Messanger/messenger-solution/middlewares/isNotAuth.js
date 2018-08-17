module.exports.isAnonymous = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
};
