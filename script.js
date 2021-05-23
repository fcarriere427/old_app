function myFunction() {

  // change le texte et sa couleur
  let element = document.getElementById("demo");
  element.innerHTML = "Le texte modifié par le script.";
  element.style.color = "blue";

  // ajoute un nouveau paragraphe
  const newElt = document.createElement("p");
  let elt = document.getElementById("main");
  elt.appendChild(newElt);
  elt.innerHTML = "nouveau paragraphe !";
}
