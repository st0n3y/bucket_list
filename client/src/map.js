var Map = function(latLng, zoom) {

  this.googleMap = new google.maps.Map(document.getElementById("map"), {
    center: latLng,
    zoom: zoom
  });

  this.addMarker = function(latLng) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap
    })
  return marker
  }

};

module.exports = Map;