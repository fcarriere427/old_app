require('dotenv').config()

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
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = 'Name: ' + data[i].name + '  //  Distance: ' + data[i].distance;
    mainContainer.appendChild(div);
  }
}

function reAuthorize(){
  const auth_link = "https://www.strava.com/oauth/token"

  fetch(auth_link,{
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.id,
      client_secret:process.env.secret,
      refresh_token: process.env.token,
      grant_type: 'refresh_token'
    })
  })
    .then(res => res.json())
    .then(res => getActivities(res))
}

reAuthorize()
