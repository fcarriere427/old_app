function myFunction() {

  $.ajax({
          url: 'https://www.strava.com/api/v3/athlete',
          beforeSend: function(xhr) {
               xhr.setRequestHeader("Authorization", "Bearer 409b05e234c62cd9800860816109f3646aa82d73")
          }, success: function(data){
              alert(data);
              //process the JSON data etc
          }
  })


  //strava_response = curl -X GET https://www.strava.com/api/v3/athlete -H 'Authorization: Bearer 409b05e234c62cd9800860816109f3646aa82d73';
  //document.getElementById("demo").innerHTML = "Paragraph changed.";
}
