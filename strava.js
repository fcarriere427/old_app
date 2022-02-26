function main(){
  // bouton "List"
  const listButton = document.getElementById('listButton');
  listButton.addEventListener('click', function(e) {
    listActivities();
  });
  // bouton "update"
  const updateButton = document.getElementById('updateButton');
  updateButton.addEventListener('click', function(e) {
    updateActivities();
  });
  // bouton "reload"
  const reloadButton = document.getElementById('reloadButton');
  reloadButton.addEventListener('click', function(e) {
    reloadActivities();
  });
  // Autres
  const activitiesDiv = document.getElementById('activitiesDiv');
}

function listActivities() {
  console.log('List button was clicked');
  fetch("/strava_app/list")
  .then(response => response.json())
  .then(data => {
    // pour afficher la liste des activités
    activitiesDiv.innerHTML = 'Voici vos ' + data.length + ' activités : ';
    var mainContainer = document.getElementById('main');
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      // calculs sur le temps
      // pour référence : https://developers.strava.com/docs/reference/#api-models-SummaryActivity
      moving_time = data[i].doc.moving_time; // en secondes
      if (moving_time > 3600) {
        h_moving_time = Math.round(moving_time/3600);
        mn_moving_time = Math.round((moving_time - h_moving_time * 3600) / 60);
        sec_moving_time = Math.round(moving_time - h_moving_time * 3600 - mn_moving_time * 60);
        time_str = h_moving_time + 'h' + mn_moving_time + 'mn' + sec_moving_time + 's';
      } else {
        mn_moving_time = Math.round((moving_time) / 60);
        sec_moving_time = Math.round(moving_time - mn_moving_time * 60);
        time_str = mn_moving_time + 'mn' + sec_moving_time + 's';
      }
      // calculs sur la vitesse
      avg_speed = data[i].doc.average_speed; // en mètres/secondes
      mn_avg_speed = Math.round(1 / (60 * avg_speed / 1000));
      sec_avg_speed = Math.round(((1/(60*avg_speed /1000)) - mn_avg_speed) * 60);
      // concaténation de la chaine pour 1 activité
      var str = '[' + data[i].doc.id + '] '
       + data[i].doc.start_date.substring(0,10)
       + ' - ' + Math.round(data[i].doc.distance / 1000 * 100) / 100 + 'km'
       + ' - ' + time_str
       + ' - ' + mn_avg_speed + 'mn' + sec_avg_speed + 'sec/km'
      // injection dans la page
      div.innerHTML = str;
      mainContainer.appendChild(div);
    }
  })
  .catch((err) => {
    console.log('"Activities" fetch problem: ' + err.message);
  })
}

function updateActivities() {
  console.log('Update button was clicked');
  fetch("/strava_app/update")
  .then(() => activitiesDiv.innerHTML = 'OK, latest activities updated!')
}

function reloadActivities() {
  console.log('Reload button was clicked');
  activitiesDiv.innerHTML = 'Reload all activities : this may take a while...';
  fetch("/strava_app/reload")
  .then(response => response.json())
  .then((data) => activitiesDiv.innerHTML = 'OK, all ' + data + ' activities reloaded!');
}

main()
