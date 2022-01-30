function getActivities(res){
  // appelle API strava avec l'access token qu'on vient de renouveller
  const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
  fetch(activities_link)
    .then(function (response) {return response.json();})
    .then(function (data) {appendData(data);})
    .catch(function (err) {console.log('error: ' + err);})
}

function appendData(data) {
  var mainContainer = document.getElementById("main");
  // test
  var test = document.createElement("div");
  test.innerHTML = 'data[0].id = ' + data[0].id;
  mainContainer.appendChild(test);

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

function reAuthorize(){
  const auth_link = "https://www.strava.com/oauth/token"
  var id = keys.client_id;
  var secret = keys.client_secret;
  var token = keys.refresh_token;

  fetch(auth_link,{
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: id,
      client_secret: secret,
      refresh_token: token,
      grant_type: 'refresh_token'
    })
  })
    .then(res => res.json())
    .then(res => getActivities(res))
}

reAuthorize()
