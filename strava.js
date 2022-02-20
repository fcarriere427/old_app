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
          moving_time = data[i].moving_time;
          mn_moving_time = Math.round(data[i].moving_time/60);
          sec_moving_time = Math.round(moving_time - mn_moving_time*60);
          // calculs sur la vitesse
          avg_speed = data[i].average_speed;
          mn_avg_speed = Math.round(1 / (60 * avg_speed / 1000));
          sec_avg_speed = Math.round(((1/(60*avg_speed /1000)) - Y) * 60);

          div.innerHTML = '[' + data[i].id + ']'
           + ' - ' + data[i].start_date
           + ' - ' + Math.round(data[i].distance / 1000 * 100) / 100 + 'km'
           + ' - ' + mn_moving_time + "mn" + sec_moving_time + "s"
           + ' - ' + mn_avg_speed + ' mn ' + sec_avg_speed + ' sec/km';
          mainContainer.appendChild(div);
        }
      })
    .catch((err) => {
      console.log('"Activities" fetch problem: ' + err.message);
    });
}

displayData()