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
       var test = document.createElement("div");
       test.innerHTML = 'data[0].id = ' + data[0].id;
       mainContainer.appendChild(test);
    })
    .catch((err) => {
      console.log('Fetch problem: ' + err.message);
    });
}

displayData()
