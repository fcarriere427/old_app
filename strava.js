function main(){
  const activitiesDiv = document.getElementById('activitiesDiv');
  const listButton = document.getElementById('listButton');
  const updateButton = document.getElementById('updateButton');
  const reloadButton = document.getElementById('reloadButton');
  listButton.addEventListener('click', function(e) {
    console.log('List button was clicked');
    activitiesDiv.innerHTML = 'List button was clicked';
    //fetch("/strava_app/list_activities");
  });
  updateButton.addEventListener('click', function(e) {
    console.log('Update button was clicked');
    activitiesDiv.innerHTML = 'Update button was clicked';
    //fetch("/update_activities");
  });
  reloadButton.addEventListener('click', function(e) {
    console.log('Reload button was clicked');
    activitiesDiv.innerHTML = 'Reload button was clicked';
    //fetch("/reload_activities");
  });
}

function fetchActivities() {
  var mainContainer = document.getElementById("main");
  // message d'attente
  // var div = document.createElement("div");
  // div.innerHTML = 'Fetching all activities data from Strava, this may take a while :-) ';
  // mainContainer.appendChild(div);
  fetch("/fetch_activities")
  .then((number) => {
    div.innerHTML = 'OK, database has been updated, and now contains ' + number + 'activities.';
    mainContainer.appendChild(div);
  })
}

function displayActivities() {
  //  appel de la route qui va récupérer les données
  fetch("/list_activities")
  .then(response => response.json())
  .then(data => {
      // pour afficher la liste des activités
      for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        // calculs sur le temps
        // pour référence : https://developers.strava.com/docs/reference/#api-models-SummaryActivity
        moving_time = data[i].moving_time; // en secondes
        h_moving_time = Math.round(moving_time/3600);
        mn_moving_time = Math.round((moving_time - h_moving_time * 3600) / 60);
        sec_moving_time = Math.round(moving_time - h_moving_time * 3600 - mn_moving_time * 60);
        if(h_moving_time > 0){
          time_str = h_moving_time + 'h' + mn_moving_time + 'mn' + sec_moving_time + 's';
        } else {
          time_str = mn_moving_time + 'mn' + sec_moving_time + 's';
        }
        // calculs sur la vitesse
        avg_speed = data[i].average_speed; // en mètres/secondes
        mn_avg_speed = Math.round(1 / (60 * avg_speed / 1000));
        sec_avg_speed = Math.round(((1/(60*avg_speed /1000)) - mn_avg_speed) * 60);
        // concaténation de la chaine pour 1 activité
        var str = '[' + data[i].id + '] '
         + data[i].start_date.substring(0,10)
         + ' - ' + Math.round(data[i].distance / 1000 * 100) / 100 + 'km'
         + ' - ' + time_str
         + ' - ' + mn_avg_speed + 'mn' + sec_avg_speed + 'sec/km'
        // injection dans la page
        div.innerHTML = str;
        mainContainer.appendChild(div);
      }
  })
  .catch((err) => {
    console.log('"Activities" fetch problem: ' + err.message);
  });
}

main()
