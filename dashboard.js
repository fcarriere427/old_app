const liste_annees = [2022,2021,2020,2019,2018,2017,2016,2015];
const mois = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
const titres_col = ['Mois', 'Réel (km)', 'Cible (km)', 'Ecart (km)', 'Réel (cumul)', 'Cible (cumul)', 'Ecart (cumul)', 'Moy (km/j)', 'Moy (km/sem)'];
const target_an = 1000;

function main(){
  // Préparation de la page html
  init();
  // Par défaut, on affiche le dashboard de l'année en cours
  const select = document.getElementById('select');
  createTab(2022);
  // Action si on change l'année
  select.addEventListener('change', function(e) {
    let year = select.value;
    createTab(year);
  });
}

function createTab(year) {
  //// préparer le tableau
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  // préparer la ligne de titre
  let ligne_titre = document.createElement('tr');
  for (var i = 0; i < titres_col.length; i++) {
    let nom_col = 'col_' + i;
    nom_col = document.createElement('th');
    nom_col.innerHTML = titres_col[i];
    ligne_titre.appendChild(nom_col);
  }
  thead.appendChild(ligne_titre);
  // créer les lignes et cellules vides, référencées 'c_ligne_colonne' (par ex : c_3_8 = 3ème ligne, 8ème colonne)
  for (let i=0;i<mois.length;i++){
    var ligne = document.createElement('tr');
    // pour la 1ère colonne (mois) => j=0, format th plutôt que td
    let nom_cell = 'c_' + i + '_' + 0;
    nom_cell = document.createElement('th');
    nom_cell.setAttribute('id','c_' + i + '_' + 0);
    nom_cell.innerHTML = 'c_' + i + '_' + 0;
    ligne.appendChild(nom_cell);
    // pour les autres colonnes de données
    for (let j=1;j<titres_col.length;j++){
      let nom_cell = 'c_' + i + '_' + j;
      nom_cell = document.createElement('td');
      nom_cell.setAttribute('id','c_' + i + '_' + j);
      nom_cell.innerHTML = 'c_' + i + '_' + j;
      ligne.appendChild(nom_cell);
    }
    // on ajoute la ligne au tableau
    tbody.appendChild(ligne);
    // ajouter le tableau dans la bonne div
    document.getElementById('resultDiv').innerHTML = 'Voici la synthèse de l\'année : ';
    document.getElementById('resultDiv').appendChild(table);
  }

  //// remplir le tableau, colonne par colonne
  // on commence par celles qui ne dépendent pas du réel : 1ère, 3ème, 6ème
  // 1ère colonne (j = 0): mois
  let j = 0;
  for (let i=0;i<mois.length;i++){
    let cel = document.getElementById('c_' + i + '_' + j);
    cel.innerHTML = mois[i];
  }
  // 3ème colonne (j = 2) : cible mensuel
  j = 2;
  for (let i=0;i<mois.length;i++){
    let cel = document.getElementById('c_' + i + '_' + j);
    cel.innerHTML = Math.round(daysInMonth(i+1, year) / daysInYear(year) * target_an*10)/10;
  }
  // 6ème colonne (j = 5) : cible cumul
  j = 5;
  for (let i=0;i<mois.length;i++){
    let cel = document.getElementById('c_' + i + '_' + j);
    let somme = 0;
    for (let k=0;k<=i;k++){ // on calcule le nb de jours jusqu'à la fin du mois en cours
      somme = somme + daysInMonth(k+1,year);
    }
    cel.innerHTML = Math.round(somme / daysInYear(year) * target_an*10)/10;
  }

  // puis on s'occupe des colonnes qui dépendent du réel (donc dépendent de la promesse)
  // pour cela, on commence par récupérer les distances par mois (dans un tableau reduce[doc.key] = doc.value, avec doc.key ='2015,07' par ex
  let reduce = [];
  getMonthDistances()
  .then(reduce => { // ici, reduce['2015,07'] renvoie la bonne valeur
    // 2ème colonne (j = 1) : réel mensuel
    j = 1;
    for (let i=0;i<mois.length;i++){
      let cel = document.getElementById('c_' + i + '_' + j);
      // lecture du tableau reduce
      let month = (i+1).toString(); if (month.length<2) { month = '0' + month };
      let key = year + ',' + month;
      // écriture
      if(reduce[key]) {
        cel.innerHTML = Math.round(reduce[key]/1000*10)/10;; // div par 1000 pour passer en km, puis arrondi au dixième
      } else {
        cel.innerHTML = 0;
      }
    }
    // 4ème colonne : écart mensuel = calcul
    j = 3;
    for (let i=0;i<mois.length;i++){
      let cel = document.getElementById('c_' + i + '_' + j);
      let reel = parseFloat(document.getElementById('c_' + i + '_' + 1).innerHTML);
      let cible = parseFloat(document.getElementById('c_' + i + '_' + 2).innerHTML);
      cel.innerHTML = Math.round((reel - cible)*10)/10;
    }

    // 5ème colonne : réel cumulé = calcul
    j = 4;
    for (let i=0;i<mois.length;i++){
      let cel = document.getElementById('c_' + i + '_' + j);
      let somme = 0;
      for (let k=0;k<=i;k++){
        somme = somme + parseFloat(document.getElementById('c_' + k + '_' + 1).innerHTML);
      }
      cel.innerHTML = Math.round(somme*10)/10;
    }

    // 7ème colonne : écart cumulé = calcul
    j = 6;
    for (let i=0;i<mois.length;i++){
      let cel = document.getElementById('c_' + i + '_' + j);
      let somme = 0;
      for (let k=0;k<=i;k++){
        somme = somme + parseFloat(document.getElementById('c_' + k + '_' + 3).innerHTML);
      }
      cel.innerHTML = Math.round(somme*10)/10;
    }

    // 8ème colonne : moyenne / jour = calcul
    j = 7;
    for (let i=0;i<mois.length;i++){
      let cel = document.getElementById('c_' + i + '_' + j);
      cel.innerHTML = Math.round(parseFloat(document.getElementById('c_' + i + '_' + 1).innerHTML) / daysInMonth(i+1, year)*10)/10;
    }

    // 9ème colonne :  moyenne / semaine = calcul
    j = 8;
    for (let i=0;i<mois.length;i++){
      let cel = document.getElementById('c_' + i + '_' + j);
      cel.innerHTML = Math.round(parseFloat(document.getElementById('c_' + i + '_' + 7).innerHTML)*7*10)/10;
    }

  })
}

function init() {
  const main = document.getElementById('main');
  //// création des éléments
  // blocs de texte
  const titre = document.createElement('h1');
  titre.innerHTML = 'Tableau de bord Strava';
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = 'Choisissez une année !';
  messageDiv.setAttribute('id','messageDiv');
  const resultDiv = document.createElement('div');
  resultDiv.innerHTML = '... en attente...';
  resultDiv.setAttribute('id','resultDiv');
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
  for (let i = 0; i < liste_annees.length; i++) {
    var option = document.createElement("option");
    option.value = liste_annees[i];
    option.text = liste_annees[i];
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
}

// récupération des distances réelles par mois
function getMonthDistances(){
  return new Promise((resolve, reject) => {
    let reduce = [];
    fetch('/strava_app/month_distance')
    .then(response => response.json())
    .then(data => {
      data.rows.forEach(doc => {
        reduce[doc.key] = doc.value;
      })
    })
    .then(data => resolve(reduce));
  })
}

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function daysInYear(year) {
  var days = 0;
  for(var month = 1; month <= 12; month++) {
    days += daysInMonth(month, year);
  }
  return days;
}

main()
