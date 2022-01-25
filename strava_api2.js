function displayData() {
  var mainContainer = document.getElementById("main");

  // test
  var test = document.createElement("div");
  test.innerHTML = 'data[0].id = ' + data[0].id;
  mainContainer.appendChild(test);


// ******* REPRENDRE ICI ************* //
  const file = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
  fetch(activities_link)
    .then(function (response) {return response.json();})
    .then(function (data) {appendData(data);})
    .catch(function (err) {console.log('error: ' + err);})

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
}




function readTextFile(file, callback) {
      var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

displayData()
