function displayData() {
  fetch("/activities")
    .then(response => response.json())
    .then(data => {
        var mainContainer = document.getElementById("main");
        for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
         // pour référence : https://developers.strava.com/docs/reference/#api-models-SummaryActivity
        div.innerHTML = 'ID: ' + data[i].id
           + '  // Date: ' + data[i].start_date
           + '  // Distance: ' + Math.round(data[i].distance / 1000 * 100) / 100 + 'km'
           + '  // Time: ' + Math.round(data[i].moving_time/60 * 100) / 100 + "mn"
           + '  // Avg speed: ' + Math.round(1000 / 60 / data[i].average_speed * 100) / 100 + "mn/km";
        mainContainer.appendChild(div);
      }
    })
    .catch((err) => {
      console.log('"Activities" fetch problem: ' + err.message);
    });
}

displayData()
