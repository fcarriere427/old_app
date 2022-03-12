function addInfo(info, data) {
  let mainContainer = document.getElementById('main');
  let p = document.createElement('p');
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
  let speed_str = mn_avg_speed + 'mn' + sec_avg_speed + '/ km'
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

export {
   addInfo,
   strTime,
   strSpeed,
   strDate
 };
