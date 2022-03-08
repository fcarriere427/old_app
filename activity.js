// L = objet Leaflet

// Récupérer les paramètres de la requete URL
const messageDiv = document.getElementById('messageDiv');
const queryString = window.location.search;
//console.log('querystring = ' + queryString); // du type "?id=345"
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
messageDiv.innerHTML = 'id de la requete = ' + id ;

//var encodedRoutes = [];
var encodedRoutes = ["{kiiHwguL`@_@Ze@Xk@Ts@Xm@tAiEPq@Fq@TcAJoBLu@Zq@Hc@t@wAVu@H}@BeAN_AM{@Fw@Lu@`@kBn@yAZe@Nu@Fw@AaAJsBz@sFOg@@s@wAuBsAf@kAYi@?c@Re@@c@Ty@c@q@Lc@Qg@g@[u@{AiC]cAQ{@Us@[g@g@Gc@[a@_@e@MsAZkAd@i@f@WfBSn@u@E@kLb@s@Zy@j@cHZ}CRqFv@cLRmE\\oDXgFXgDB_BLwBAw@BWP[Ew@P{B@eBr@_HPsBTeF@_APqBFuBHy@LwBRq@VkB?oBZk@d@JTp@Fr@@z@HpAJv@Dt@Jt@Zj@d@TPn@Tj@t@vCZj@Tp@lBjAnA`ArAn@dAr@b@TjANvBFlAXf@RX[`@Wf@Kd@@d@T^b@Vl@Nv@BdAxEdGVb@XZbAp@~CzFf@t@bCjEpBdEv@nAlBjDPn@D`@DdCLp@Rr@l@vAZh@^b@dAl@nA^v@\\~B~BbAp@jAXtCMf@DhAb@dAn@f@l@tB|C~@~@~FdCxCrBb@\\Jp@Dv@GtBFz@Rp@v@pA`@^bAn@rBHfATnCnAb@X`A~@nDpF~@dA`@Td@Dd@E~Am@vBAb@P\\d@Rt@bA`Gd@RFHVt@tAbBb@VlBIpBHPVRr@Fh@v@dCC`AhA~@FL@j@CjBHz@C~@Iz@Sr@?NLnBm@bBIfBDjEDbBFz@Tn@Ft@W|@Kv@?x@Up@_A|@y@lAgAjC[h@_@d@s@~A_B`BmBZ_@J?FJz@`@hBJx@LbBLx@Fv@?dCIrDa@hFUrBcAfGiAxEq@|A]f@cCbC_BrA}@d@uDpAoBT_DLwF_@iAQ_D{@[g@a@OmBe@}EaBk@[}EmBcAk@a@a@oBeDq@aB_AuCW{AUoB@_AE{@?wBFu@Hu@j@}AXi@\\g@hBkBpAcBFa@s@sAaBwAmCsBQEi@d@e@Hy@@c@Uu@uA_AcAiCkBa@Ie@F_@d@c@Nc@?eAg@oAY_@`@_@h@iCnF_@^e@F_@U]e@gAcBuBsCw@qA_@c@[k@uBcDq@qAmBgDaFsG[g@_@a@yASeFiEy@iAQC]PWn@Op@gCdHqAbCgDdFMXAX}AvAa@f@Sr@GH"];

fetch(`/strava_app/activity?id=${id}`)
.then(response => response.json())
.then(data => {
  //console.log('Ici on a récupéré l\'activité normalement, par ex data.distance = ' + data.distance)
  console.log('typeof data : ' + typeof(data));
  let polyline = data.map.summary_polyline;

  // let polyline_corrected = polyline.replace('\\','\\\\');
  //encodedRoutes = polyline_corrected;
  //encodedRoutes = polyline;
  //console.log('encodedRoutes = ' + encodedRoutes);
  //console.log('polyline = ' + polyline);
  //console.log('polyline_corrected = ' + polyline_corrected);

  polyline_obj = polyline;
  //polyline_obj = polyline.json();
  console.log('typeof encodedRoutes : ' + typeof(encodedRoutes));
  console.log('typeof polyline : ' + typeof(polyline));
  console.log('typeof polyline_obj : ' + typeof(polyline_obj));

  if (encodedRoutes === polyline_obj){
    console.log('encodedRoutes === polyline_obj !')
  } else {
    if (encodedRoutes == polyline_obj) {
      console.log('encodedRoutes == polyline_obj !')
    } else {
      console.log('encodedRoutes <> polyline_obj !')
    }
  }

    // Ajout de la  map
  // centrée sur le bois de Boulogne : 48.86427818167459, 2.245533745325779
  // centrée sur Malmo : 55.609818, 13.003286
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
