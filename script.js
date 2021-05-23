let element = document.getElementById("body");
element.addEventListener('mousemove', function(event) {
    const x = event.offsetX; // Coordonnée X de la souris dans l'élément
    const y = event.offsetY; // Coordonnée Y de la souris dans l'élément
    element.innerHTML = "X = " + x + " ; Y = " + y;
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
