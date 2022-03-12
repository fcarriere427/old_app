// L = objet Leaflet

// Récupérer les paramètres de la requete URL
const messageDiv = document.getElementById('messageDiv');
const queryString = window.location.search; // du type "?id=345"
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

var encodedRoute = [];

fetch(`/strava_app/activity?id=${id}`)
.then(response => response.json())
.then(data => {
  //console.log('Ici on a récupéré l\'activité, par ex data.distance = ' + data.distance)
  ////// DETAILS DES INFOS //////
  // pour référence : https://developers.strava.com/docs/reference/#api-models-SummaryActivity
  let ligne = document.createElement('p');
  ligne.innerHTML = 'id : ' + data.id;
  let ligne = document.createElement('p');
  ligne.innerHTML = 'name : ' + data.name;
  let ligne = document.createElement('p');
  ligne.innerHTML = 'moving_time : ' + data.moving_time;
  let ligne = document.createElement('p');
  ligne.innerHTML = 'total_elevation_gain : ' + data.total_elevation_gain;
  let ligne = document.createElement('p');
  ligne.innerHTML = 'start_date_local : ' + data.start_date_local;
  let ligne = document.createElement('p');
  ligne.innerHTML = 'average_speed : ' + data.average_speed;
  
  ////// MAP //////
  let polyline = data.map.summary_polyline;
  encodedRoute = polyline.split(); // pour convertir en array...
  // On centre par défaut sur le bois de Boulogne
  var map = L.map('map').setView([48.86427818167459, 2.245533745325779], 13);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);
  // Ajout de la trace
  for (let encoded of encodedRoute) { // mais en fait on ne va en récupérer qu'une !
    var coordinates = L.Polyline.fromEncoded(encoded).getLatLngs();
    L.polyline(
      coordinates,
      {
          color: 'red',
          weight: 3,
          opacity: .7,
          lineJoin: 'round'
      }
    ).addTo(map);
  }
  // Auto-centrage et autp-zoom
  const bounds = L.latLngBounds(coordinates);
  map.fitBounds(bounds);

})
