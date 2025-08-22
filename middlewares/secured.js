module.exports = function(req, res, next) {
  if (req.session && req.session.nombre) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};
