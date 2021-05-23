let element = document.getElementById("main");
element.addEventListener('mousemove', function(event) {
    const x1 = event.offsetX; // Coordonnée X de la souris dans l'élément
    const y1 = event.offsetY; // Coordonnée Y de la souris dans l'élément
    const x2 = event.offsetX; // Coordonnée X de la souris dans le document
    const y2 = event.offsetY; // Coordonnée Y de la souris dans le document
    element.innerHTML = "Offset : X  = " + x1 + " ; Y = " + y1 + "Doc : X  = " + x2 + " ; Y = " + y2;

});

// function changeP() {
//   // change le texte et sa couleur
//   let element = document.getElementById("demo");
//   element.innerHTML = "Le texte modifié par le script.";
//   element.style.color = "blue";
// }
//
//
// function addP() {
//   // ajoute un nouveau paragraphe
//   let p = document.createElement("p");
//   document.getElementById("main").appendChild(p);
//   p.innerHTML = "nouveau paragraphe !";
//   p.style.color = "#FF0000";
// }
//
// function followPointer() {
//   let element = document.getElementById("new");
//   element.addEventListener('click', function() {
//     elt.innerHTML = "C'est cliqué !";
//   });
// }
