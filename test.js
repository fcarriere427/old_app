function displayData() {
  var mainContainer = document.getElementById("main");

// On doit appeler le server, puis afficher les données //
  var div = document.createElement("div");
  div.innerHTML = 'on va afficher qq chose';
  mainContainer.appendChild(div);
  fetch("/activities")
    // ******* REPRENDRE ICI ************* //
    // que récupère-t-on de la route activities ??? //
    .then(response => console.log(response))
    // .then(response => response.json())
    // .then(json => console.log(json))
    // // .then(json => {
    //   var div = document.createElement("div");
    //   div.innerHTML = 'on a bien appelé la route "activities", qui répond : ' + json;
    //   mainContainer.appendChild(div);
    // })
    //
    .catch((err) => {
      console.log('Fetch problem: ' + err.message);
    });
}

displayData()
