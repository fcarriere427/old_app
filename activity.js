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
  addInfo('id', data);
  addInfo('name', data);
  addInfo('moving_time', data);
  addInfo('total_elevation_gain', data);
  addInfo('start_date_local', data);
  addInfo('average_speed', data);
  addInfo('average_cadence', data);
  addInfo('average_heartrate', data);

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

function addInfo(info, data) {
  let mainContainer = document.getElementById('main');
  let p = document.createElement('p');
  switch(info) {
    case 'moving_time':
      str_info = strTime(data);
      break;
    case 'average_speed':
      str_info = strSpeed(data);
      break;
    case 'total_elevation_gain':
      str_info = data[info] + 'm';
      break;
    case 'start_date_local':
/// to do
      str_info = data[info];
      break;
    case 'average_cadence':
      str_info = data[info] + 'pas/mn';
      break;
    case 'average_heartrate':
      str_info = data[info] + 'bpm';
      break;
    case 'undefined':
      str_info ='N/A';
      break;
    default:
      if (data[info]) {
        str_info = data[info];
      } else {
        str_info ='N/A';
      }
  }
  p.innerHTML = '<b>' + info + '</b>' + ' : ' + str_info;
  mainContainer.appendChild(p);
}

// prend un time en absolu en entrée, renvoie une chaine "xh ymn z"
function strTime(data) {
  let moving_time = data.moving_time; // en secondes
  if (moving_time > 3600) {
    h_moving_time = Math.trunc(moving_time/3600);
    mn_moving_time = Math.trunc((moving_time - h_moving_time * 3600) / 60);
    sec_moving_time = Math.round(moving_time - h_moving_time * 3600 - mn_moving_time * 60);
    time_str = h_moving_time + 'h ' + mn_moving_time + 'mn ' + sec_moving_time;
  } else {
    mn_moving_time = Math.trunc((moving_time) / 60);
    sec_moving_time = Math.trunc(moving_time - mn_moving_time * 60);
    time_str = mn_moving_time + 'mn ' + sec_moving_time;
  }
  return time_str;
}

// prend une vitesse en m/s, renvoie une chaine "x mn y / km"
function strSpeed(data) {
  let avg_speed = data.average_speed; // en mètres/secondes
  let pace = 1 / avg_speed * 1000; // en secondes par km
  let mn_avg_speed = Math.trunc(pace / 60);
  let sec_avg_speed = Math.round(pace - 60 * mn_avg_speed);
  let speed_str = mn_avg_speed + 'mn ' + sec_avg_speed + ' / km'
  return speed_str;
}

// prend une date au format standard (2022-02-26T09:52:09Z), renvoie une chaine "JJ/MM/YY à HHhmm"
function strDate(data) {
  let date = data.start_date_local; // ex : 2022-02-26T09:52:09Z
//  let newDate = new Date(date);
//  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

  let date_str = date.toLocaleDateString()
  return date_str;
}
