import {getMonthDistances, daysInYear, mois} from './functions.js';

function main(){
  // préparation des éléments de la page
  init();
  updateTracker();
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
    let delta_days = Math.round(delta / tgt * daysInYear(year)*10)/10;
    summary_l3.innerHTML = 'Days of advance / late = ' + delta_days + " days";
    let new_avg_week = Math.round((tgt - delta) / daysInYear(year) * 7 * 10)/10;
    summary_l4.innerHTML = 'New avg/week = ' +  new_avg_week + " km";
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
          type: 'solidgauge',
          height: 200
      },

      title: null,

      pane: {
          center: ['50%', '100%'],
          size: '150%',
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
              [0, '#DF5353'],// red
              [0.5, '#55BF3B'], // green
              [1, '#DDDF0D'] // red
          ],
          lineWidth: 0,
          tickWidth: 1,
          minorTickInterval: 10,
          tickAmount: 2,
          title: {
              align: 'low'
          },
          labels: {
              y: 15
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
          data: array, //data: [-80],
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
  const summary_l1 = document.createElement('h4');
  summary_l1.setAttribute('id', 'summary_l1');
  summary_l1.setAttribute('style','text-align:center')
  const summary_l2 = document.createElement('h4');
  summary_l2.setAttribute('id', 'summary_l2');
  summary_l2.setAttribute('style','text-align:center')
  const summary_l3 = document.createElement('h4');
  summary_l3.setAttribute('id', 'summary_l3');
  summary_l3.setAttribute('style','text-align:center')
  const summary_l4 = document.createElement('h4');
  summary_l4.setAttribute('id', 'summary_l4');
  summary_l4.setAttribute('style','text-align:center')
  // création du graphe
  const chart = document.createElement('div');
  chart.setAttribute('id', 'container');
  chart.setAttribute('class', 'chart-container');
  chart.setAttribute('height', '300px');
  // inputs de la target
  let tgt_div = document.createElement('div');
  let tgt_label = document.createElement('label');
  tgt_label.setAttribute('id', 'tgt_label');
  tgt_label.innerHTML = 'Target: ';
  let tgt_input = document.createElement('input');
  tgt_input.setAttribute('id', 'target');
  tgt_input.setAttribute('type', 'number');
  tgt_input.setAttribute('value', 1000);
  tgt_div.appendChild(tgt_label);
  tgt_div.appendChild(tgt_input);

  // création de la page
  main.appendChild(titre);
  main.appendChild(summary_l1);
  main.appendChild(summary_l2);
  main.appendChild(summary_l3);
  main.appendChild(summary_l4);
  main.appendChild(chart);
  main.appendChild(tgt_div);

}

main()
