function changeP() {
  // change le texte et sa couleur
  let element = document.getElementById("demo");
  element.innerHTML = "Le texte modifié par le script.";
  element.style.color = "blue";
}


function addP() {
  // ajoute un nouveau paragraphe
  let p = document.createElement("p");
  document.getElementById("main").appendChild(p);
  p.innerHTML = "nouveau paragraphe !";
  p.style.color = "#FF0000";
}

function followPointer() {
  let element = document.getElementById("new");
  element.addEventListener('click', function() {
    elt.innerHTML = "C'est cliqué !";
  });
}
