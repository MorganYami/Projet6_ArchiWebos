// récupération projets

async function fetchProjets() {
    const r = await fetch("http://localhost:5678/api/works", {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        }
    })
    if (r.ok === true) {
        return r.json();
    }
    else {
        try {
            throw new Error('Impossible de contacter le serveur')
        }
        catch (error) {
            console.error(error);
        }
    }
}

//génération des fiches projets
const gallery = document.getElementById("gallery");
function genererProjets(projets) {
    console.log(projets);
    for (let i = 0; i < projets.length; i++) {
        const projetsElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        imageElement.src = projets[i].imageUrl;
        captionElement.innerHTML = projets[i].title;
        projetsElement.appendChild(imageElement);
        projetsElement.appendChild(captionElement);
        gallery.appendChild(projetsElement);
    }
}

//affichage initial de la page
const projets = fetchProjets().then(projets => genererProjets(projets))

//filtrage des projets
let filtres = document.getElementsByClassName("filtreOn")
let filtreOn = filtres[0]
const filtreTous = document.getElementById("Tous")
const filtreObjets = document.getElementById("Objets")
const filtreAppartements = document.getElementById("Appartements")
const filtreHotelsResto = document.getElementById("HotelsResto")

filtreTous.addEventListener("click", function () {
    let filtres = document.getElementsByClassName("filtreOn")
    let filtreOn = filtres[0]
    filtreOn.classList.remove("filtreOn")
    filtreTous.classList.add("filtreOn")
    console.log("click: " + projets);
})

filtreObjets.addEventListener("click", function () {
    let filtres = document.getElementsByClassName("filtreOn")
    let filtreOn = filtres[0]
    filtreOn.classList.remove("filtreOn")
    filtreObjets.classList.add("filtreOn")
})

filtreAppartements.addEventListener("click", function () {
    let filtres = document.getElementsByClassName("filtreOn")
    let filtreOn = filtres[0]
    filtreOn.classList.remove("filtreOn")
    filtreAppartements.classList.add("filtreOn")
})

filtreHotelsResto.addEventListener("click", function () {
    let filtres = document.getElementsByClassName("filtreOn")
    let filtreOn = filtres[0]
    filtreOn.classList.remove("filtreOn")
    filtreHotelsResto.classList.add("filtreOn")
})