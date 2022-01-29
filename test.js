function displayData() {
  var mainContainer = document.getElementById("main");

// On doit appeler le server, puis afficher les données //
  var div = document.createElement("div");
  div.innerHTML = 'code de test.js';
  mainContainer.appendChild(div);
  fetch("/activities")
    .then(response => console.log(response.data))

    // .then(response => response.json())
    // .then(json => {
    //   console.log("response.json = " + json.data);
    //   // ******* REPRENDRE ICI ************* //
    //   // intégrer la boucle qui affiche toutes les données strava
    //   var div = document.createElement("div");
    //   div.innerHTML = 'on a bien appelé la route "activities", qui répond : ' + json.data;
    //   mainContainer.appendChild(div);
    // })
    .catch((err) => {
      console.log('Fetch problem: ' + err.message);
    });
}

displayData()
