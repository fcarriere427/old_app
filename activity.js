// L = objet Leaflet

// Récupérer les paramètres de la requete URL
const messageDiv = document.getElementById('messageDiv');
const queryString = window.location.search;
//console.log('querystring = ' + queryString); // du type "?id=345"
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
messageDiv.innerHTML = 'id de la requete = ' + id ;

//var encodedRoutes = [];
var encodedRoutes_old = ["{zkrIm`inANPD?BDXGPKLATHNRBRFtAR~AFjAHl@D|ALtATj@HHJBL?`@EZ?NQ\\Y^MZURGJKR]RMXYh@QdAWf@[~@aAFGb@?j@YJKBU@m@FKZ[NSPKTCRJD?`@Wf@Wb@g@HCp@Qh@]z@SRMRE^EHJZnDHbBGPHb@NfBTxBN|DVbCBdA^lBFl@Lz@HbBDl@Lr@Bb@ApCAp@Ez@g@bEMl@g@`B_AvAq@l@    QF]Rs@Nq@CmAVKCK?_@Nw@h@UJIHOZa@xA]~@UfASn@U`@_@~@[d@Sn@s@rAs@dAGN?NVhAB\\Ox@@b@S|A?Tl@jBZpAt@vBJhATfGJn@b@fARp@H^Hx@ARGNSTIFWHe@AGBOTAP@^\\zBMpACjEWlEIrCKl@i@nAk@}@}@yBOWSg@kAgBUk@Mu@[mC?QLIEUAuAS_E?uCKyCA{BH{DDgF`AaEr@uAb@oA~@{AE}AKw@    g@qAU[_@w@[gAYm@]qAEa@FOXg@JGJ@j@o@bAy@NW?Qe@oCCc@SaBEOIIEQGaAe@kC_@{De@cE?KD[H[P]NcAJ_@DGd@Gh@UHI@Ua@}Bg@yBa@uDSo@i@UIICQUkCi@sCKe@]aAa@oBG{@G[CMOIKMQe@IIM@KB]Tg@Nw@^QL]NMPMn@@\\Lb@P~@XT"];

fetch(`/strava_app/activity?id=${id}`)
.then(response => response.json())
.then(data => {
  //console.log('Ici on a récupéré l\'activité normalement, par ex data.distance = ' + data.distance)
  let polyline = data.map.summary_polyline;
  //let polyline_corrected = JSON.stringify(polyline);
  let polyline_corrected = polyline.replace('\\','\\\\');
  encodedRoutes = '["' + polyline_corrected + '"]';
  console.log('encodedRoutes = ' + encodedRoutes);
  console.log('encodedRoutes_old = ' + encodedRoutes_old);
  // Ajout de la  map
  // centrée sur le bois de Boulogne
  var map = L.map('map').setView([48.86427818167459, 2.245533745325779], 13);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

  // Ajout des traces
  for (let encoded of encodedRoutes) {
    var coordinates = L.Polyline.fromEncoded(encoded).getLatLngs();
    L.polyline(
      coordinates,
      {
          color: 'red',
          weight: 2,
          opacity: .7,
          lineJoin: 'round'
      }
    ).addTo(map);
  }
})
