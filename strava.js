// pour référence : https://developers.strava.com/docs/reference/#api-models-SummaryActivity


function displayData() {
  fetch("/activities_list")
    .then(response => response.json())
    // .then(data => {
    //   // *** pour afficher la liste des activités
    //     var mainContainer = document.getElementById("main");
    //     var div = document.createElement("div");
    //     string = JSON.stringify(data);
    //     div.innerHTML = string;
    //     mainContainer.appendChild(div);
    //   })
    .then(data => {
        // pour afficher la liste des activités
        var mainContainer = document.getElementById("main");
        for (var i = 0; i < data.length; i++) {
          var div = document.createElement("div");
          // calculs sur le temps
          moving_time = data[i].moving_time; // en secondes
          h_moving_time = Math.round(moving_time/3600);
          mn_moving_time = Math.round((moving_time - h_moving_time * 3600) / 60);
          sec_moving_time = Math.round(moving_time - mn_moving_time * 60 /100) * 100;
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
           + data[i].start_date.substring(0,9)
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

displayData()
