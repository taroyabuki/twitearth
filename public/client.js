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
