module.exports.isAdmin = function (req, res, next) {
  if (req.isAuthenticated() && req.user.roles.includes('Admin')) {
    next();
  } else {
    res.redirect('/');
  }
};
