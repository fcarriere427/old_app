import {strDate, strTime, strSpeed } from './functions.js';

function main(){
  // Préparation de la page html
  init();

  // Action si
  const listButton = document.getElementById('listButton');
  const select = document.getElementById('select');
  select.addEventListener('change', function(e) {
    cleanDiv();
    let year = select.value;
    listActivities(year);
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
}

function listActivities(year) {
  console.log('List button was clicked');
  //messageDiv.innerHTML = 'Préparation des activités...';
  fetch(`/strava_app/list?id=${year}`)
  .then(response => response.json())
  .then(data => {
    // pour afficher la liste des activités
    //messageDiv.innerHTML = 'Voici vos ' + data.length + ' activités : ';
    let resultDiv = document.getElementById('resultDiv');
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
      resultDiv.appendChild(div);
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

function init() {
  const main = document.getElementById('main');
  //// création des éléments
  // blocs de texte
  const titre = document.createElement('h1');
  titre.innerHTML = 'Activités Strava';
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = 'Choisissez une année et cliquez !';
  messageDiv.setAttribute('id','messageDiv');
  const resultDiv = document.createElement('div');
  resultDiv.innerHTML = '... en attente...';
  resultDiv.setAttribute('id','resultDiv');
  // boutons
  const listButton = document.createElement('button');
  listButton.innerHTML = 'Lister';
  listButton.setAttribute('id','listButton');
  const updateButton = document.createElement('button');
  updateButton.innerHTML = 'Mettre à jour';
  updateButton.setAttribute('id','updateButton');
  const reloadButton = document.createElement('button');
  reloadButton.innerHTML = 'Recréer (long !)';
  reloadButton.setAttribute('id','reloadButton');
  // lignes
  const ligne1 = document.createElement('hr');
  ligne1.size = 1;
  ligne1.width = '100%';
  ligne1.color = 'orange';
  const ligne2 = document.createElement('hr');
  ligne2.size = 1;
  ligne2.width = '100%';
  ligne2.color = 'grey';
  const ligne3 = document.createElement('hr');
  ligne3.size = 1;
  ligne3.width = '100%';
  ligne3.color = 'orange';
  // select
  let liste_annees = [2022,2021,2020,2019,2018,2017,2016,2015];
  let select = document.createElement('select');
  select.id = 'select';
  for (let i = 0; i < liste_annees.length; i++) {
    var option = document.createElement("option");
    option.value = liste_annees[i];
    option.text = liste_annees[i];
    select.appendChild(option);
  }
  // création de la page
  main.appendChild(titre);
  //main.appendChild(listButton);
  //main.appendChild(ligne1);
  main.appendChild(select);
  main.appendChild(messageDiv);
  main.appendChild(ligne2);
  main.appendChild(resultDiv);
  main.appendChild(ligne3);
  main.appendChild(updateButton);
  main.appendChild(reloadButton);
}

main()
