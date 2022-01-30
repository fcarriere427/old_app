function displayData() {
  var mainContainer = document.getElementById("main");

// On doit appeler le server, puis afficher les données //
  var div = document.createElement("div");
  div.innerHTML = 'code de test.js';
  mainContainer.appendChild(div);
  fetch("/activities")
    // .then(response => {
    //   console.log(response);
    // })
    .then(response => response.json())
    .then(data => {
       console.log("response.json = " + data);

       //   // ******* REPRENDRE ICI ************* //
       //   // intégrer la boucle qui affiche toutes les données strava

       var mainContainer = document.getElementById("main");
       // test
       // var test = document.createElement("div");
       // test.innerHTML = 'data[0].id = ' + data[0].id;
       // mainContainer.appendChild(test);

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
      console.log('Fetch problem: ' + err.message);
    });
}

displayData()
