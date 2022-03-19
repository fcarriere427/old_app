import {getMonthDistances, daysInYear} from './functions.js';

const mois = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function main(){
  // préparation des éléments de la page
  init();
  updateTracker();

  // Action si on change l'année
  select.addEventListener('change', function(e) {
    updateTracker();
  });
  // Action si on change la target
  target.addEventListener('change', function(e) {
    updateTracker();
  });
}

function updateTracker(){
  // récupération de la target
  let tgt = target.value;
  // extraction de l'année en cours
  var now = new Date();
  let year = now.getFullYear();
  // récupération du cumul courant
  let reduce = [];
  let actual = 0;
  getMonthDistances()
  .then(reduce => {
    // ici, reduce['2015,07'] renvoie la bonne valeur
    let current = 0;
    for (let i = 1; i <= 12; i++){
      let month = (i).toString(); if (month.length<2) { month = '0' + month };
      let key = year + ',' + month;
      if (reduce[key]) {
        current = current + reduce[key];
      }
    }
    actual = Math.round(current/1000*10)/10;; // div par 1000 pour passer en km, puis arrondi au dixième
    //// mise à jour des stats
    // actual
    summary_l2.innerHTML = 'Actual to date = ' + actual + " km";
    // target à date
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    let target_date = Math.round(day / daysInYear(year) * tgt*10)/10;
    summary_l1.innerHTML = 'Target to date = ' + target_date + " km";
    // autres stats
    let delta = Math.round((actual - target_date)*10)/10;
    summary_l3.innerHTML = 'Delta = ' + delta + " km";
    let delta_days = Math.round(delta / tgt * daysInYear(year)*10)/10;
    summary_l4.innerHTML = 'Days of advance / late = ' + delta_days + " days";
    let new_avg_week = Math.round((tgt - delta) / daysInYear(year) * 7 * 10)/10;
    summary_l5.innerHTML = 'New avg/week = ' +  new_avg_week + " km";
    // ajout du graphe
    document.addEventListener('DOMContentLoaded', addGraph(delta));
  })
}

function addGraph(value){

  // convert into array
  let array = new Array(1);
  array[0] = value;

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

function init() {
  const main = document.getElementById('main');

  //// création des éléments
  // blocs de texte
  const titre = document.createElement('h2');
  titre.innerHTML = 'Tracker Strava';
  const summary_l1 = document.createElement('p');
  summary_l1.setAttribute('id', 'summary_l1');
  const summary_l2 = document.createElement('p');
  summary_l2.setAttribute('id', 'summary_l2');
  const summary_l3 = document.createElement('p');
  summary_l3.setAttribute('id', 'summary_l3');
  const summary_l4 = document.createElement('p');
  summary_l4.setAttribute('id', 'summary_l4');
  const summary_l5 = document.createElement('p');
  summary_l5.setAttribute('id', 'summary_l5');

  // inputs de la target
  let tgt_name = document.createElement('p');
  tgt_name.setAttribute('id', 'tgt_name');
  tgt_name.innerHTML = 'Current year target: ';
  let target = document.createElement('input');
  target.setAttribute('id', 'target');
  target.setAttribute('type', 'number');
  target.setAttribute('value', 1000);

  const chart = document.createElement('div');
  chart.setAttribute('id', 'container');
  chart.setAttribute('class', 'graph');
  // création de la page
  main.appendChild(titre);
  main.appendChild(summary_l1);
  main.appendChild(summary_l2);
  main.appendChild(summary_l3);
  main.appendChild(summary_l4);
  main.appendChild(summary_l5);
  main.appendChild(chart);
  main.appendChild(tgt_name);
  main.appendChild(target);

}

main()
