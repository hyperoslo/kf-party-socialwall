exports.index = function(req, res) {
  res.render('index', { title: 'KF-pils Social Wall' });
};

exports.callback = function(req, res) {
  req.io.broadcast('instagram', { photo: 'test' });
  res.send('Roger!');
};
