const liste_annees = [2022,2021,2020,2019,2018,2017,2016,2015];
const mois = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
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
  // préparer le tableau
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  // préparer la ligne de titre
  let ligne_titre = document.createElement('tr');
  let col_titres = ['Mois', 'Réel', 'Cible', 'Ecart', 'Réel (cumul)', 'Cible (cumul)', 'Ecart (cumul)', 'Moyenne / jour', 'Moyenne / semaine'];
  for (var i = 0; i < col_titres.length; i++) {
    let nom_col = 'col_' + i;
    nom_col = document.createElement('th');
    nom_col.innerHTML = col_titres[i];
    ligne_titre.appendChild(nom_col);
  }
  thead.appendChild(ligne_titre);

  // remplir le tableau
  for (let j=0;j<mois.length;j++){
    var ligne = document.createElement('tr');
    // 1ère colonne : mois
    let col_1 = document.createElement('td');
    col_1.setAttribute('id','col_1');
    col_1.innerHTML = mois[j];
    ligne.appendChild(col_1);
    // 2ème colonne : réel mensuel = à extraire de la DB
    let col_2 = document.createElement('td');
    col_2.setAttribute('id','col_2');
    col_2.innerHTML = 777;
    ligne.appendChild(col_2);
    // 3ème colonne : cible mensuel = calcul
    let col_3 = document.createElement('td');
    col_3.setAttribute('id','col_3');
    col_3.innerHTML = target_an/12;
    ligne.appendChild(col_3);
    // 4ème colonne : écart mensuel = calcul
    let col_4 = document.createElement('td');
    col_4.setAttribute('id','col_4');
    console.log('parseInt(col_3.innerText) = ' + parseInt(col_3.innerText));
    let calcul = parseInt(col_3.innerText) - parseInt(col_2.innerText);
    console.log('calcul = '+ calcul);
    col_4.innerHTML = calcul;
    ligne.appendChild(col_3);
    // 5ème colonne : réel cumulé = calcul
    // 6ème colonne : cible cumulé = calcul
    // 7ème colonne : écart cumulé = calcul
    // 8ème colonne : moyenne / jour = calcul
    // 9ème colonne :  moyenne / semaine = calcul
    // on ajoute la ligne au tableau
    tbody.appendChild(ligne);
  }
  // ajouter le tableau dans la bonne div
  document.getElementById('resultDiv').appendChild(table);
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

main()
