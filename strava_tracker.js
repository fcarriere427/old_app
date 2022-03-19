import {getMonthDistances, daysInYear, daysInMonth} from './functions.js';

function main(){
  init();
//  addGraph();
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

  // définition de l'année = TO DO
  let year = 2022;

  // récupération des données
  let reduce = [];
  let current = 0;
  getMonthDistances()
  .then(reduce => { // ici, reduce['2015,07'] renvoie la bonne valeur
    for (let i = 1; i <= 12; i++){
      let month = (i).toString(); if (month.length<2) { month = '0' + month };
      let key = year + ',' + month;
      if (reduce[key]) {
        current = current + reduce[key];
      }
      console.log("après mois " + i + ", current = " + current);
    }
    // écriture
    let actual = Math.round(current/1000*10)/10;; // div par 1000 pour passer en km, puis arrondi au dixième
    console.log('Dans init, actual = ' + actual);
    document.addEventListener('DOMContentLoaded', addGraph(actual));
  })
}

function addGraph(actual){

  // convert into array
  console.log('actual = ' + actual);
  let array = new Array(1);
  array[0] = actual;
  console.log('array[0] = ' + array[0]);

  var gaugeOptions = {
      chart: {
          type: 'solidgauge'
      },

      title: null,

      pane: {
          center: ['50%', '85%'],
          size: '100%',
          startAngle: -90,
          endAngle: 90,
          background: {
              backgroundColor:
                  Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc'
          }
      },

      exporting: {
          enabled: false
      },

      tooltip: {
          enabled: false
      },

      // the value axis
      yAxis: {
          stops: [
              // green = #55BF3B, yellow = #DDDF0D, red = '#DF5353'
              [0.1, '#DF5353'],// red
              [0.5, '#55BF3B'], // green
              [0.9, '#DDDF0D'] // red
          ],
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
              y: -70
          },
          labels: {
              y: 16
          }
      },

      plotOptions: {
          solidgauge: {
              dataLabels: {
                  y: 5,
                  borderWidth: 0,
                  useHTML: true
              }
          }
      }
  };

  // The speed gauge
  var chartSpeed = Highcharts.chart('container', Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: -100,
          max: 100,
          // title: {
          //     text: 'Delta'
          // }
      },

      credits: {
          enabled: false
      },

      series: [{
          name: 'Delta',
          data: array,
          //data: [-80],
          dataLabels: {
              format:
                  '<div style="text-align:center">' +
                  '<span style="font-size:25px">{y}</span><br/>' +
                  '<span style="font-size:12px;opacity:0.4">km</span>' +
                  '</div>'
          },
          tooltip: {
              valueSuffix: ' km'
          }
      }]

  }));

}

main()
