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

//génération des fiches
const gallery = document.getElementById("gallery");
function genererProjets(param) {
    for (let i = 0; i < param.length; i++) {
        const projetsElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        imageElement.src = param[i].imageUrl;
        captionElement.innerHTML = param[i].title;
        projetsElement.appendChild(imageElement);
        projetsElement.appendChild(captionElement);
        gallery.appendChild(projetsElement);
    }
}

function genererObjets(param2) {
    let projetObjets = [];
    for (let i = 0; i < param2.length; i++) {
        if (param2[i].categoryId == 1) {
            projetObjets.push(param2[i]);
        }
    }
    for (let i = 0; i < projetObjets.length; i++) {
        const projetsElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        imageElement.src = projetObjets[i].imageUrl;
        captionElement.innerHTML = projetObjets[i].title;
        projetsElement.appendChild(imageElement);
        projetsElement.appendChild(captionElement);
        gallery.appendChild(projetsElement);
    }
}

function genererAppart(param3) {
    let projetAppart = [];
    for (let i = 0; i < param3.length; i++) {
        if (param3[i].categoryId == 2) {
            projetAppart.push(param3[i]);
        }
    }
    for (let i = 0; i < projetAppart.length; i++) {
        const projetsElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        imageElement.src = projetAppart[i].imageUrl;
        captionElement.innerHTML = projetAppart[i].title;
        projetsElement.appendChild(imageElement);
        projetsElement.appendChild(captionElement);
        gallery.appendChild(projetsElement);
    }
}

function genererHR(param4) {
    let projetHR = [];
    for (let i = 0; i < param4.length; i++) {
        if (param4[i].categoryId == 3) {
            projetHR.push(param4[i]);
        }
    }
    for (let i = 0; i < projetHR.length; i++) {
        const projetsElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        imageElement.src = projetHR[i].imageUrl;
        captionElement.innerHTML = projetHR[i].title;
        projetsElement.appendChild(imageElement);
        projetsElement.appendChild(captionElement);
        gallery.appendChild(projetsElement);
    }
}

//affichage initial de la page
const projetsAll = fetchProjets();
projetsAll.then(projets => genererProjets(projets));


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
    gallery.innerHTML = ("");
    projetsAll.then(projets => genererProjets(projets));
})

filtreObjets.addEventListener("click", function () {
    let filtres = document.getElementsByClassName("filtreOn")
    let filtreOn = filtres[0]
    filtreOn.classList.remove("filtreOn")
    filtreObjets.classList.add("filtreOn")
    gallery.innerHTML = ("");
    projetsAll.then(objets => genererObjets(objets));
})

filtreAppartements.addEventListener("click", function () {
    let filtres = document.getElementsByClassName("filtreOn")
    let filtreOn = filtres[0]
    filtreOn.classList.remove("filtreOn")
    filtreAppartements.classList.add("filtreOn")
    gallery.innerHTML = ("");
    projetsAll.then(Appart => genererAppart(Appart));
})

filtreHotelsResto.addEventListener("click", function () {
    let filtres = document.getElementsByClassName("filtreOn")
    let filtreOn = filtres[0]
    filtreOn.classList.remove("filtreOn")
    filtreHotelsResto.classList.add("filtreOn")
    gallery.innerHTML = ("");
    projetsAll.then(HR => genererHR(HR));
})