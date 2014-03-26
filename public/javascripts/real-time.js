var io = io.connect();

io.emit('ready');

io.on('message', function(message) {
  console.log('Got a new message', message);
});

io.on('instagram', function(photo) {
  console.log('Got photo details', photo);
});
