function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: -21.76141, lng: -41.32061}
    });
  
    var xml = new KmlMapParser({ map: map, kml: '../a.kml', });
    console.log(xml)
  }

    
