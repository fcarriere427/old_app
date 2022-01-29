function displayData() {
  var mainContainer = document.getElementById("main");

// ******* REPRENDRE ICI ************* //
// On doit appeler le server, puis afficher les données //
  var div = document.createElement("div");
  div.innerHTML = 'on va afficher qq chose';
  mainContainer.appendChild(div);
  fetch("/activities")
    .then(response=>response.json())
    .then(json => {
      console.log(json);
      var div = document.createElement("div");
      div.innerHTML = 'on a bien appelé la route "test" + response : ' + json;
      mainContainer.appendChild(div);
    })
    .catch((err) => {
      console.log('Fetch problem: ' + err.message);
    });
}

displayData()
