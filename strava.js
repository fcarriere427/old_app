function main(){
  // bouton "List"
  const listButton = document.getElementById('listButton');
  listButton.addEventListener('click', function(e) {
    cleanDiv();
    listActivities();
  });
  // bouton "update"
  const updateButton = document.getElementById('updateButton');
  updateButton.addEventListener('click', function(e) {
    cleanDiv();
    updateActivities();
  });
  // bouton "reload"
  const reloadButton = document.getElementById('reloadButton');
  reloadButton.addEventListener('click', function(e) {
    cleanDiv();
    reloadActivities();
  });
  // Autres
  const messageDiv = document.getElementById('messageDiv');
}



function cleanDiv(){
  var div = document.getElementById('activity-'+ i);
  var i = 0;
  var div = document.getElementById('activity-'+ i);
  while (div) {
    div.parentNode.removeChild(div);
    i = i + 1;
    div = document.getElementById('activity-'+ i);
  }
}

function listActivities() {
  console.log('List button was clicked');
  messageDiv.innerHTML = 'Préparation des activités...';
  fetch("/strava_app/list")
  .then(response => response.json())
  .then(data => {
    // pour afficher la liste des activités
    messageDiv.innerHTML = 'Voici vos ' + data.length + ' activités : ';
    var mainContainer = document.getElementById('main');
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement('div');
      div.setAttribute('id','activity-' + i);
      // calculs sur le temps
      // pour référence : https://developers.strava.com/docs/reference/#api-models-SummaryActivity
      moving_time = data[i].doc.moving_time; // en secondes
      if (moving_time > 3600) {
        h_moving_time = Math.trunc(moving_time/3600);
        mn_moving_time = Math.trunc((moving_time - h_moving_time * 3600) / 60);
        sec_moving_time = Math.round(moving_time - h_moving_time * 3600 - mn_moving_time * 60);
        time_str = h_moving_time + 'h' + mn_moving_time + 'mn' + sec_moving_time + 's';
      } else {
        mn_moving_time = Math.trunc((moving_time) / 60);
        sec_moving_time = Math.trunc(moving_time - mn_moving_time * 60);
        time_str = mn_moving_time + 'mn' + sec_moving_time + 's';
      }
      // calculs sur la vitesse
      avg_speed = data[i].doc.average_speed; // en mètres/secondes
      pace = 1 / avg_speed * 1000; // en secondes par km
      mn_avg_speed = Math.trunc(pace / 60);
      sec_avg_speed = Math.round(pace - 60 * mn_avg_speed);

      // concaténation de la chaine pour 1 activité
      var str =
      //'[' + data[i].doc.id + '] '+
       data[i].doc.start_date.substring(0,10)
       + ' _ ' + Math.round(data[i].doc.distance / 1000 * 100) / 100 + 'km'
       + ' _ ' + time_str
       + ' _ ' + mn_avg_speed + 'mn' + sec_avg_speed + '/km';
      // injection dans la page
      var rec_link = "./map.html/?id=" + data[i].doc.id;
      div.innerHTML = "[<a href=rec_link target='_blank'>" + data[i].doc.id + "</a>] " + str;
      mainContainer.appendChild(div);
    }
  })
  .catch((err) => {
    console.log('"Activities" fetch problem: ' + err.message);
  })
}

function updateActivities() {
  console.log('Update button was clicked');
  messageDiv.innerHTML = 'Récupération des dernières données...';
  fetch("/strava_app/update")
  .then(() => messageDiv.innerHTML = 'OK, les dernières activités ont bien été récupérées !')
}

function reloadActivities() {
  console.log('Reload button was clicked');
  messageDiv.innerHTML = 'RAZ des données : ça va prendre un peu de temps...';
  fetch("/strava_app/reload")
  .then(response => response.json())
  .then((data) => messageDiv.innerHTML = 'OK, les ' + data + ' activités ont bien été rechargées !');
}

main()
