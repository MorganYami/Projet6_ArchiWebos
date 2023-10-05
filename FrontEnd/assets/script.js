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
    throw new Error('Impossible de contacter le serveur')
}

//génération des fiches projets
const gallery = document.getElementById("gallery");
function genererProjets(projets) {
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

