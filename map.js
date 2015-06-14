$(function() {
  var map, spaceship, message, infowindow, geocoder;
  var smartkarma = new google.maps.LatLng(1.335056, 103.964932);

    initialize();

  function initialize() {
    geocoder = new google.maps.Geocoder();

    var mapOptions = {
      zoom: 8,
      center: smartkarma
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }

  function locateAddress() {
    var location = $('#map-input').val().trim(); 
    if(!location) {
      alert('Sorry, Commander! We didn\'t receive an address!');
      $('#map-input').focus();
      return;
    }
    geocoder.geocode( { 'address': location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var address = results[0].geometry.location;
        launchSpaceship(address);
        $('#map-input').val("");
      } else {
        alert('Sorry, Commander! We cannot find the address you provide!');
      }
    });
  }

  function launchSpaceship(address) {
    if(spaceship) {
      spaceship.setMap(null);
    }
    map.setZoom(8);
    map.panTo(address);

    $('#spaceship').fadeOut();

    var icon = {
      url: $('#spaceship').attr('src'),
      scaledSize: new google.maps.Size(32, 32)
    };

    spaceship = new google.maps.Marker({
      position: address,
      map: map,
      icon: icon,
      animation: google.maps.Animation.DROP
    });

    spaceship.setMap(map);

    setTimeout(landSpaceship, 500);
  }

  function landSpaceship() {
    message = "<p class='map-message'>Landing...</p>";
    infowindow = new google.maps.InfoWindow({
      content: message
    });
    infowindow.open(map, spaceship);
    setTimeout(zoomIn, 500);
  }

  function zoomIn() {
    smoothZoom(map, 16, map.getZoom(), landSuccess);
  }

  function landSuccess() {
    setTimeout(showMessage, 500);
  }

  function showMessage() {
    infowindow.setContent("<p class='map-message'>Landed Successfully!</p>")
  }

  // the smooth zoom function
  function smoothZoom (map, max, cnt, callback) {
    if (cnt >= max) {
      callback(); 
      return;
    }
    else {
      z = google.maps.event.addListener(map, 'zoom_changed', function(event){
        google.maps.event.removeListener(z);
        smoothZoom(map, max, cnt + 1, callback);
      });
      setTimeout(function(){map.setZoom(cnt)}, 120); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
  }

  $('#map-form').submit(function(e) {
    e.preventDefault();
    locateAddress();
  });
});
