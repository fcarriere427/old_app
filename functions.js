const mois = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Remplissage du tableau annees
let start_year = 2015 // début des activités Strava
const annees = [];
let last_year = new Date().getFullYear();
let i = last_year - start_year;
for (let year = start_year; year <= last_year; year++){
  annees[i]=year;
  i = i-1;
}
console.log('annees = ' + annees.toString());

function addInfo(info, data) {
  let mainContainer = document.getElementById('main');
  let p = document.createElement('p');
  let str_info = '';
  if (data[info]) {
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
        str_info = strDate(data);
        break;
      case 'average_cadence':
        str_info = data[info] + 'pas/mn';
        break;
      case 'average_heartrate':
        str_info = data[info] + 'bpm';
        break;
      default:
        str_info = data[info];
    }
  } else {
    str_info ='N/A';
  }
  p.innerHTML = '<b>' + info + '</b>' + ' : ' + str_info;
  mainContainer.appendChild(p);
}

// prend un time en absolu en entrée, renvoie une chaine "xh ymn z"
function strTime(data) {
  let moving_time = data.moving_time; // en secondes
  let time_str = '';
  if (moving_time > 3600) {
    let h_moving_time = Math.trunc(moving_time/3600);
    let mn_moving_time = Math.trunc((moving_time - h_moving_time * 3600) / 60);
    let sec_moving_time = Math.round(moving_time - h_moving_time * 3600 - mn_moving_time * 60);
    time_str = h_moving_time + 'h ' + mn_moving_time + 'mn ' + sec_moving_time + 's';
  } else {
    let mn_moving_time = Math.trunc((moving_time) / 60);
    let sec_moving_time = Math.trunc(moving_time - mn_moving_time * 60);
    time_str = mn_moving_time + 'mn ' + sec_moving_time + 's';
  }
  return time_str;
}

// prend une vitesse en m/s, renvoie une chaine "x mn y / km"
function strSpeed(data) {
  let avg_speed = data.average_speed; // en mètres/secondes
  let pace = 1 / avg_speed * 1000; // en secondes par km
  let mn_avg_speed = Math.trunc(pace / 60);
  let sec_avg_speed = Math.round(pace - 60 * mn_avg_speed);
  let speed_str = mn_avg_speed + 'mn' + sec_avg_speed + '/km'
  return speed_str;
}

// prend une date au format standard (2022-02-26T09:52:09Z), renvoie une chaine "JJ/MM/YY à HHhmm"
function strDate(data) {
  let date = data.start_date_local; // ex : 2022-02-26T09:52:09Z
  let newDate = new Date(date);
//  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  let date_str = newDate.toLocaleDateString('fr-FR') + ' à ' + newDate.toLocaleTimeString('fr-FR');
  return date_str;
}

// récupération des distances réelles par mois
function getMonthDistances(){
  return new Promise((resolve, reject) => {
    let reduce = [];
    fetch('/strava_app/month_distance')
    .then(response => response.json())
    .then(data => {
      data.rows.forEach(doc => {
        reduce[doc.key] = doc.value;
      })
    })
    .then(data => resolve(reduce));
  })
}

// récupération de la date de la dernière activité
function getLastActivityDate(){
  let year = annees[0];
  return new Promise((resolve, reject) => {
    fetch(`/strava_app/list?id=${year}`)
    .then(response => response.json())
    .then(data => {
      let last_activity = data[0].doc.start_date;
      let newDate = new Date(last_activity);
      let date_str = newDate.toLocaleDateString('fr-FR') + ' at ' + newDate.toLocaleTimeString('fr-FR');
      resolve(date_str);
    })
    .catch((err) => {
      console.log('"Activities" fetch problem: ' + err.message);
    })
  })
}

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function daysInYear(year) {
  var days = 0;
  for(var month = 1; month <= 12; month++) {
    days += daysInMonth(month, year);
  }
  return days;
}

export {
   annees,
   mois,
   addInfo,
   strTime,
   strSpeed,
   strDate,
   getMonthDistances,
   getLastActivityDate,
   daysInYear,
   daysInMonth
 };
