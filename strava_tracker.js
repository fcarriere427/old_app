function main(){
  init();
  testGraph();
}

function init() {
  const main = document.getElementById('main');
  //// création des éléments
  // blocs de texte
  const titre = document.createElement('h2');
  titre.innerHTML = 'Tracker Strava';

  const chart = document.createElement('div');
  chart.setAttribute('id', 'container');
  chart.setAttribute('class', 'graph');
  // création de la page
  main.appendChild(titre);
  main.appendChild(chart);
}

function testGraph(){
  document.addEventListener('DOMContentLoaded', function () {
        const chart = Highcharts.chart('container', {
            series: [{
                name: 'John',
                data: [5, 7, 3],
                type: gauge
            }]
        });
    });
}


main()
