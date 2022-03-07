// L = objet Leaflet

// Récupérer les paramètres de la requete URL
const messageDiv = document.getElementById('messageDiv');
const queryString = window.location.search;
//console.log('querystring = ' + queryString); // du type "?id=345"
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
messageDiv.innerHTML = 'id de la requete = ' + id ;

var encodedRoutes = ["{zkrIm`inANPD?BDXGPKLATHNRBRFtAR~AFjAHl@D|ALtATj@HHJBL?`@EZ?NQ\\Y^MZURGJKR]RMXYh@QdAWf@[~@aAFGb@?j@YJKBU@m@FKZ[NSPKTCRJD?`@Wf@Wb@g@HCp@Qh@]z@SRMRE^EHJZnDHbBGPHb@NfBTxBN|DVbCBdA^lBFl@Lz@HbBDl@Lr@Bb@ApCAp@Ez@g@bEMl@g@`B_AvAq@l@    QF]Rs@Nq@CmAVKCK?_@Nw@h@UJIHOZa@xA]~@UfASn@U`@_@~@[d@Sn@s@rAs@dAGN?NVhAB\\Ox@@b@S|A?Tl@jBZpAt@vBJhATfGJn@b@fARp@H^Hx@ARGNSTIFWHe@AGBOTAP@^\\zBMpACjEWlEIrCKl@i@nAk@}@}@yBOWSg@kAgBUk@Mu@[mC?QLIEUAuAS_E?uCKyCA{BH{DDgF`AaEr@uAb@oA~@{AE}AKw@    g@qAU[_@w@[gAYm@]qAEa@FOXg@JGJ@j@o@bAy@NW?Qe@oCCc@SaBEOIIEQGaAe@kC_@{De@cE?KD[H[P]NcAJ_@DGd@Gh@UHI@Ua@}Bg@yBa@uDSo@i@UIICQUkCi@sCKe@]aAa@oBG{@G[CMOIKMQe@IIM@KB]Tg@Nw@^QL]NMPMn@@\\Lb@P~@XT",
"u}krIq_inA_@y@My@Yu@OqAUsA]mAQc@CS@o@FSHSp@e@n@Wl@]ZCFEBK?OC_@Qw@?m@CSK[]]EMBeAA_@m@qEAg@UoCAaAMs@IkBMoACq@SwAGOYa@IYIyA_@kEMkC]{DEaAScC@yEHkGA_ALsCBiA@mCD{CCuAZcANOH@HDZl@Z`@RFh@\\TDT@ZVJBPMVGLM\\Mz@c@NCPMXERO|@a@^Ut@s@p@KJAJ    Bd@EHEXi@f@a@\\g@b@[HUD_B@uADg@DQLCLD~@l@`@J^TF?JANQ\\UbAyABEZIFG`@o@RAJEl@_@ZENDDIA[Ki@BURQZaARODKVs@LSdAiAz@G`BU^A^GT@PRp@zARXRn@`BlDHt@ZlAFh@^`BX|@HHHEf@i@FAHHp@bBd@v@DRAVMl@i@v@SROXm@tBILOTOLs@NON_@t@KX]h@Un@k@\\c@h@Ud@]ZGNKp@Sj@KJo@    b@W`@UPOX]XWd@UF]b@WPOAIBSf@QVi@j@_@V[b@Uj@YtAEFCCELARBn@`@lBjAzD^vB^hB?LENURkAv@[Ze@Xg@Py@p@QHONMA[HGAWE_@Em@Hg@AMCG@QHq@Cm@M[Jy@?UJIA{@Ae@KI@GFKNIX[QGAcAT[JK?OVMFK@IAIUKAYJI?QKUCGFIZCXDtAHl@@p@LjBCZS^ERAn@Fj@Br@Hn@HzAHh@RfD?j@TnCTlA    NjANb@\\z@TtARr@P`AFnAGfBG`@CFE?"]

fetch(`/strava_app/activity?id=${id}`)
.then(response => response.json())
.then(data => {
  console.log('Ici on a récupéré l\'activité normalement, par ex data.distance = ' + data.distance)
  //****** var encodedRoutes = data.polylines;
  // ici = remplacer encodedRoutes par un extract du champ d'un run, en traitant bien les backlash avant
  console.log('encodedRoutes = ' + data.map.summary_polyline);
  encodedRoutes = data.map.summary_polyline;
  // Ajout de la  map
  var map = L.map('map').setView([55.609818, 13.003286], 13);
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
