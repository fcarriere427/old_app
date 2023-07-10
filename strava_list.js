import {strTime, strSpeed, annees } from './functions.js';

function main(){
  // Préparation de la page html
  init();
  // Par défaut, on affiche la liste des activités de l'année en cours
  const select = document.getElementById('select');
  listActivities(2023);
  // Action si on change l'année
  select.addEventListener('change', function(e) {
    let year = select.value;
    listActivities(year);
  });
  // bouton "update"
  const updateButton = document.getElementById('updateButton');
  updateButton.addEventListener('click', function(e) {
    updateActivities();
  });
  // bouton "reload"
  const reloadButton = document.getElementById('reloadButton');
  reloadButton.addEventListener('click', function(e) {
    reloadActivities();
  });
}

function listActivities(year) {
  cleanDiv();
  //messageDiv.innerHTML = 'Préparation des activités...';
  fetch(`/api/strava/list?year=${year}`)
  .then(response => response.json())
  .then(data => {
    // pour afficher la liste des activités
    let messageDiv = document.getElementById('messageDiv');
    messageDiv.innerHTML = 'Here are your ' + data.length + ' activities : ';
    let resultDiv = document.getElementById('resultDiv');
    resultDiv.innerHTML='';
    createTab(data);
  })
  .catch((err) => {
    console.log('"Activities" fetch problem: ' + err.message);
  })
}

function createTab(data){
  // préparer le tableau
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  // préparer la ligne de titre
  let ligne_titre = document.createElement('tr');
  let col_1 = document.createElement('th');
  col_1.innerHTML = 'Date';
  let col_2 = document.createElement('th');
  col_2.innerHTML = 'Name';
  let col_3 = document.createElement('th');
  col_3.innerHTML = 'Distance';
  let col_4 = document.createElement('th');
  col_4.innerHTML = 'Duration';
  let col_5 = document.createElement('th');
  col_5.innerHTML = 'Pace';
  ligne_titre.appendChild(col_1);
  ligne_titre.appendChild(col_2);
  ligne_titre.appendChild(col_3);
  ligne_titre.appendChild(col_4);
  ligne_titre.appendChild(col_5);
  thead.appendChild(ligne_titre);

  // remplir le tableau
  for (var i = 0; i < data.length; i++) {
    var ligne = document.createElement('tr');
    let col_1 = document.createElement('td');
    let rec_link = "./activity.html?id=" + data[i].doc.id;
    col_1.innerHTML = "<a href=" + rec_link + ">" + data[i].doc.start_date.substring(0,10) + "</a>";
    let col_2 = document.createElement('td');
    col_2.innerHTML = data[i].doc.name;
    let col_3 = document.createElement('td');
    col_3.innerHTML = Math.round(data[i].doc.distance / 1000 * 100) / 100 + 'km';
    let col_4 = document.createElement('td');
    col_4.innerHTML = strTime(data[i].doc);
    let col_5 = document.createElement('td');
    col_5.innerHTML = strSpeed(data[i].doc);
    ligne.appendChild(col_1);
    ligne.appendChild(col_2);
    ligne.appendChild(col_3);
    ligne.appendChild(col_5);
    ligne.appendChild(col_4);
    tbody.appendChild(ligne);
  }
  // ajouter le tableau dans la bonne div
  document.getElementById('resultDiv').appendChild(table);
}

function updateActivities() {
  console.log('Update button was clicked');
  cleanDiv();
  messageDiv.innerHTML = 'We are fetching latest data...';
  fetch("/api/strava/update")
  .then(() => {
    messageDiv.innerHTML = 'OK, latest data downloaded!';
    listActivities(2022);
    //resultDiv.innerHTML = 'Pick up a year to see activities';
  })
}

function reloadActivities() {
  console.log('Reload button was clicked');
  cleanDiv();
  messageDiv.innerHTML = 'Complete download of summary activities: it might take a while...';
  fetch("/api/strava/reload")
  .then(response => response.json())
  .then((data) => {
    messageDiv.innerHTML = 'OK, the ' + data + ' activities have been loaded (including "other than run")!';
    //listActivities(2022);
    resultDiv.innerHTML = 'Pick up a year to see activities';
  })
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
  const titre = document.createElement('h2');
  titre.innerHTML = 'Strava activities';
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = 'Pick up a year!';
  messageDiv.setAttribute('id','messageDiv');
  const resultDiv = document.createElement('div');
  resultDiv.innerHTML = '... waiting ...';
  resultDiv.setAttribute('id','resultDiv');
  // boutons
  const updateButton = document.createElement('button');
  updateButton.innerHTML = 'Update';
  updateButton.setAttribute('id','updateButton');
  const reloadButton = document.createElement('button');
  reloadButton.innerHTML = 'Reload (!)';
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
  let select = document.createElement('select');
  select.id = 'select';
  for (let i = 0; i < annees.length; i++) {
    var option = document.createElement("option");
    option.value = annees[i];
    option.text = annees[i];
    select.appendChild(option);
  }
  // création de la page
  main.appendChild(titre);
  main.appendChild(ligne1);
  main.appendChild(select);
  main.appendChild(messageDiv);
  main.appendChild(ligne2);
  main.appendChild(resultDiv);
  main.appendChild(ligne3);
  main.appendChild(updateButton);
  main.appendChild(reloadButton);
}

main()
