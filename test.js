function displayData() {
  var mainContainer = document.getElementById("main");

// ******* REPRENDRE ICI ************* //
// On doit appeler le server, puis afficher les données //
  var div = document.createElement("div");
  div.innerHTML = 'on va afficher qq chose';
  mainContainer.appendChild(div);
  fetch("test")
    .then(response=>response.json())
    .then(json => {
      console.log(json);
      var div = document.createElement("div");
      div.innerHTML = 'on a bien appelé la route "test" + response : ' + json;
      mainContainer.appendChild(div);
    })

// // test
//   var test = document.createElement("div");
//   test.innerHTML = 'data[0].id = ' + data[0].id;
//   mainContainer.appendChild(test);
  }

// function readTextFile(file, callback) {
//       var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }

displayData()
