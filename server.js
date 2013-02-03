/*
 *  twitearth : Mashup of Twitter and Google Maps
 *  Copyright 2013 Taro YABUKI
 *
 *  This file is part of twitearth.
 *
 *  OneMaps is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  OneMaps is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with OneMaps.  If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
 
//port: Heroku || AppFog || 3000
var port = process.env.PORT || process.env.VMC_APP_PORT || 3000;
server.listen(port);
 
app.use(express.static(__dirname + '/public'));

var twitter = require('ntwitter');
//var twitter = require('immortal-ntwitter');
var tw = new twitter(require('./config').getKeys());

tw.stream('statuses/filter', {'locations': '-180,-90,180,90'}, function(stream) {
//tw.immortalStream('statuses/filter', {'locations': '-180,-90,180,90'}, function(stream) {
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
