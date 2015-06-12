$(function() {
  var map, spaceship, message, infowindow, geocoder;
  var smartkarma = new google.maps.LatLng(1.335056, 103.964932);

  initialize(); 

  function initialize() {
    var mapOptions = {
      zoom: 8,
      center: smartkarma
    };

    // understand how function works. Don't be afraid of the seemingly complex api,
    // they are just methods/functions waiting for you to use.
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }

  // understand event and event handler
  $('#map-form').submit(function(e) {
    e.preventDefault();
    locateAddress();
  }); 

  function locateAddress() {
    // TODO: get the value from input the commander provide using jquery
    var location =  

    // TODO: show alert info when no location is provided in the input box
    if() {

    }

    // use google map api to analysis your location
    geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var address = results[0].geometry.location;

        // lauch your spaceship here with valid address
        launchSpaceship(address);
      } else {
        alert('Sorry, Commander! We cannot find the address you provide!');
      }
    });
  }

  // TODO: fade out your spaceship image and show it on the map
  function launchSpaceship(address) {


    spaceship = new google.maps.Marker({

    });

    // start to land your spaceship when it appears on the map after 0.5 second
    setTimeout(landSpaceship, 500);
  }

  // TODO: show "landing..." message box above the spaceship
  function landSpaceship() {
    
    infowindow = new google.maps.InfoWindow({
      
    });
    
    // start to zoom in after 0.5 second
    setTimeout(zoomIn, 500);
  }

  // TODO: call smoothZoom function provided below with landSuccess as callback function
  function zoomIn() {
    
  }

  function landSuccess() {
    setTimeout(showMessage, 500);
  }

  // TODO: change the message box content to "Landed Successfully!"
  function showMessage() {
    
  }

  // smoothZoom is provided to zoom in the map smoothly.
  // map: map
  // max: maximum zoom you want to achieve
  // cnt: current zoom the map is
  // callback: function you want to call in the end
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
});

/*
  Bonus: 
  1. clear the input box content when necessary
  2. let input box get focus when necessary
  3. other details that you think necessary
*/
