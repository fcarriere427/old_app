import {strDate, strTime, strSpeed } from './functions.js';

function main(){
  // bouton "List"
  const listButton = document.getElementById('listButton');
  listButton.addEventListener('click', function(e) {
    cleanDiv();
    listActivities();
  });
  // bouton "update"
  const updateButton = document.getElementById('updateButton');
  updateButton.addEventListener('click', function(e) {
    cleanDiv();
    updateActivities();
  });
  // bouton "reload"
  const reloadButton = document.getElementById('reloadButton');
  reloadButton.addEventListener('click', function(e) {
    cleanDiv();
    reloadActivities();
  });
  // Autres
  const messageDiv = document.getElementById('messageDiv');
}

function listActivities() {
  console.log('List button was clicked');
  messageDiv.innerHTML = 'Préparation des activités...';
  fetch("/strava_app/list")
  .then(response => response.json())
  .then(data => {
    // pour afficher la liste des activités
    messageDiv.innerHTML = 'Voici vos ' + data.length + ' activités : ';
    var mainContainer = document.getElementById('main');
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement('div');
      div.setAttribute('id','activity-' + i);
      let time_str = strTime(data[i].doc);
      let speed_str = strSpeed(data[i].doc);
      // concaténation de la chaine pour 1 activité
      var str =
       data[i].doc.start_date.substring(0,10)
       + ' - ' + Math.round(data[i].doc.distance / 1000 * 100) / 100 + 'km'
       + ' - ' + time_str
       + ' - ' + speed_str;
      // injection dans la page
      var rec_link = "./activity.html?id=" + data[i].doc.id;
      //console.log('lien = ' + rec_link);
      div.innerHTML = "[<a href=" + rec_link + " target='_blank'>" + data[i].doc.id + "</a>] " + str;
      //div.innerHTML = "[<a href=rec_link target='_blank'>" + data[i].doc.id + "</a>] " + str;
      mainContainer.appendChild(div);
    }
  })
  .catch((err) => {
    console.log('"Activities" fetch problem: ' + err.message);
  })
}

function updateActivities() {
  console.log('Update button was clicked');
  messageDiv.innerHTML = 'Récupération des dernières données...';
  fetch("/strava_app/update")
  .then(() => messageDiv.innerHTML = 'OK, les dernières activités ont bien été récupérées !')
}

function reloadActivities() {
  console.log('Reload button was clicked');
  messageDiv.innerHTML = 'RAZ des données : ça va prendre un peu de temps...';
  fetch("/strava_app/reload")
  .then(response => response.json())
  .then((data) => messageDiv.innerHTML = 'OK, les ' + data + ' activités ont bien été rechargées !');
}

function cleanDiv(){
  var i = 0;
  var div = document.getElementById('activity-'+ i);
  while (div) {
    div.parentNode.removeChild(div);
    i = i + 1;
    div = document.getElementById('activity-'+ i);
  }
}

main()
