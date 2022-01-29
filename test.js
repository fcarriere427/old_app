function displayData() {
  var mainContainer = document.getElementById("main");

// On doit appeler le server, puis afficher les données //
  var div = document.createElement("div");
  div.innerHTML = 'on va afficher qq chose';
  mainContainer.appendChild(div);
  fetch("/activities")
    // ******* REPRENDRE ICI ************* //
    .then(response => response.json())
    .then(json => {
      console.log("response.json = " + json.data);
      var div = document.createElement("div");
      div.innerHTML = 'on a bien appelé la route "activities", qui répond : ' + json.data;
      mainContainer.appendChild(div);
    })
    //
    .catch((err) => {
      console.log('Fetch problem: ' + err.message);
    });
}

displayData()
