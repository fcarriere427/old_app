function myFunction() {

  // change le texte et sa couleur
  let element = document.getElementById("demo");
  element.innerHTML = "Le texte modifié par le script.";
  element.style.color = "blue";

  // ajoute un nouveau paragraphe
  let p = document.createElement("p");
  document.getElementById("main").appendChild(p);
  p.innerHTML = "nouveau paragraphe !";
}
