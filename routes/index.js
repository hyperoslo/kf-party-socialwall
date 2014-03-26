exports.index = function(req, res) {
  res.render('index', { title: 'KF-pils Social Wall' });
};

exports.subscribe = function(req, res) {
  res.send(req.query['hub.challenge']);
};

exports.callback = function(req, res) {
  req.io.broadcast('instagram', { photo: 'test' });
  res.send('Roger!');
};
