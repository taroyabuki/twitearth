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

var map;
var socket;

$(document).ready(function() {
  var myOptions = {
    zoom : 2,
    center : new google.maps.LatLng(20, 180),
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    panControl: false,
    streetViewControl: false,
    zoomControl: false
  };
 
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  socket = io.connect();

  socket.on('connect', function() {
  });

  socket.on('message', function(data) {
    var lng = data.lnglat[0];
    var lat = data.lnglat[1];
    var name = data.name;
    $('#img').attr('src', data.img);
    $('#id').text(data.id);
    $('#name').text(data.sname);
    $('#text').text(data.text);
    marker = new google.maps.Marker({
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      //icon: data.img,
      position: new google.maps.LatLng(lat, lng)
    });
    
  });
});
