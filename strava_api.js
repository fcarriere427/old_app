function getActivities(res){
  // appelle API strava avec l'access token qu'on vient de renouveller
  const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
  // temp pour voir ce qu'il y a dans res
  var mainContainer = document.getElementById("main");
  var div = document.createElement("div");
  div.innerHTML = 'res: ' + res;
  mainContainer.appendChild(div);
  // fin du tmp
  fetch(activities_link)
    .then(function (response) {return response.json();})
    .then(function (data) {appendData(data);})
    .catch(function (err) {console.log('error: ' + err);})
}

function appendData(data) {
  var mainContainer = document.getElementById("main");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = 'Name: ' + data[i].name + '  //  Distance: ' + data[i].distance / 1000 + "km // Time: " + data[i].moving_time/60 + "mn";
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
