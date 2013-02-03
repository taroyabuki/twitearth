var express = require('express')
, http = require('http');

var app = express();
app.use(express.static(__dirname + '/public'));
//port: Heroku || AppFog || 3000
var port = process.env.PORT || process.env.VMC_APP_PORT || 3000;
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});
var io = require('socket.io').listen(server);

//var twitter = require('ntwitter');
var twitter = require('immortal-ntwitter');
var tw = new twitter(require('./config').getKeys());

//tw.stream('statuses/filter', {'locations': '-180,-90,180,90'}, function(stream) {
tw.immortalStream('statuses/filter', {'locations': '-180,-90,180,90'}, function(stream) {
  stream.on('data', function (data) {
    if (data.coordinates) {
      //console.log(data);
      io.sockets.emit('message', {
        'id': data.id_str,
        'text': data.text,
        'lnglat': data.coordinates.coordinates,
        'sname': data.user.screen_name,
        'img': data.user.profile_image_url
      });
    }
  });
  stream.on('error', function (response) {
    console.log(response);
    process.exit();
  });
  stream.on('end', function (response) {
    console.log(response);
    process.exit();
  });
  stream.on('destroy', function (response) {
    console.log(response);
    process.exit();
  });
});
