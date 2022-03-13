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
  for (var i = 0; i < col_titres.length; i++) {
    var ligne = document.createElement('tr');
    let nom_col = 'col_' + i;
    nom_col = document.createElement('th')
    nom_col.innerHTML = '1';
    ligne.appendChild(nom_col);
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
  main.appendChild(ligne1);
  main.appendChild(select);
  main.appendChild(messageDiv);
  main.appendChild(ligne2);
  main.appendChild(resultDiv);
  main.appendChild(ligne3);
}

main()
