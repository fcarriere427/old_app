// L = objet Leaflet

// Récupérer les paramètres de la requete URL
const messageDiv = document.getElementById('messageDiv');
const queryString = window.location.search; // du type "?id=345"
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
messageDiv.innerHTML = 'Activité n°' + id ;

var encodedRoute = [];

fetch(`/strava_app/activity?id=${id}`)
.then(response => response.json())
.then(data => {
  //console.log('Ici on a récupéré l\'activité normalement, par ex data.distance = ' + data.distance)
  let polyline = data.map.summary_polyline;
  encodedRoute = polyline.split(); // pour convertir en array...

    // Ajout de la  map
  // centrée sur le bois de Boulogne : 48.86427818167459, 2.245533745325779
  // centrée sur Malmo : 55.609818, 13.003286
  var map = L.map('map').setView([48.86427818167459, 2.245533745325779], 13);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

  // Ajout des traces
  for (let encoded of encodedRoute) {
    var coordinates = L.Polyline.fromEncoded(encoded).getLatLngs();
    L.polyline(
      coordinates,
      {
          color: 'red',
          weight: 2,
          opacity: .7,
          lineJoin: 'round'
      }
    ).addTo(map);
  }

  const bounds = L.latLngBounds(coordinates);
  console.log('bounds = ' + bounds);
  map.fitBounds(bounds);

})
