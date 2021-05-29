function getActivities(res){
    // appelle API strava avec l'access token qu'on vient de renouveller
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => console.log(res.json()))
    // affiche le contenu
    let element = document.getElementById("main");
    element.innerHTML = res.json();
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
      client_id: '60862',
      client_secret: '2de20b9281f033da472a94eb775743eaa95bd49d',
      refresh_token: '1fa2b3a8d0efb1df86c7f4ed1d67fc03e89ea3ac',
      grant_type: 'refresh_token'
    })
  })
    .then(res => res.json())
    .then(res => getActivities(res))
}

reAuthorize()
