function main(){
  init()
}

function init() {
  const main = document.getElementById('main');
  //// création des éléments
  // blocs de texte
  const titre = document.createElement('h2');
  titre.innerHTML = 'Tracker Strava';
  // création de la page
  main.appendChild(titre);
}

main()
