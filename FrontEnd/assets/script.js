//  ----------  récupération projets

async function fetchProjets() {
    const response = await fetch("http://localhost:5678/api/works", {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        }
    })
    if (response.ok === true) {
        return await response.json();
    }
    throw new Error('Impossible de contacter le serveur')
}

// ----------  génération des fiches (functions)
// afficher tous les projets
const gallery = document.getElementById("gallery");

function displayProjets(projets) {
    projets.forEach(projets => {
        gallery.innerHTML += `
        <figure>
        <img src="${projets.imageUrl}" alt="${projets.title}">
        <figcaption>${projets.title}</figcaption>
    </figure>
        `
    });
}

// afficher les projets objets
function displayObjets(projets) {
    let projetObjets = [];
    // function categorieObjet (objet) {
    //     return objet == 1;
    // }
    // projetObjets = projets.filter ( categorieObjet);

    for (let i = 0; i < projets.length; i++) {
        if (projets[i].categoryId == 1) {
            projetObjets.push(projets[i]);
        }
    }
    displayProjets(projetObjets);
}

// afficher les projets Appartements
function displayAppart(projets) {
    let projetAppart = [];
    for (let i = 0; i < projets.length; i++) {
        if (projets[i].categoryId == 2) {
            projetAppart.push(projets[i]);
        }
    }
    displayProjets(projetAppart);
}

// afficher les projets Hôtels et Restaurants
function displayHR(projets) {
    let projetHR = [];
    for (let i = 0; i < projets.length; i++) {
        if (projets[i].categoryId == 3) {
            projetHR.push(projets[i]);
        }
    }
    displayProjets(projetHR);
}

// ----------  affichage initial de la page
const projets = [];
const projetsAll = fetchProjets();
projetsAll.then(projets => displayProjets(projets));
// fetchProjets().then(data => {
//     data.forEach(projets => projets.push(projets));
//     displayProjets(projets);
// })

// ----------  filtrage des projets - (Event listener)
const filtres = document.getElementsByClassName("filtreOn")
const filtreTous = document.getElementById("Tous")
const filtreObjets = document.getElementById("Objets")
const filtreAppartements = document.getElementById("Appartements")
const filtreHotelsResto = document.getElementById("HotelsResto")

// changer le bouton actif et vider la gallerie
function toggleFiltre (boutonActif) {
    const filtreOn = filtres[0]
    filtreOn.classList.toggle("filtreOn")
    boutonActif.classList.toggle("filtreOn")
    gallery.innerHTML = ("");
}

// afficher tous les projets
filtreTous.addEventListener("click", function () {
    toggleFiltre (filtreTous);
    projetsAll.then(projets => displayProjets(projets));
})

// afficher les projets objets
filtreObjets.addEventListener("click", function () {
    toggleFiltre (filtreObjets);
    projetsAll.then(objets => displayObjets(objets));
})

// afficher les projets Appartements
filtreAppartements.addEventListener("click", function () {
    toggleFiltre (filtreAppartements);
    projetsAll.then(Appart => displayAppart(Appart));
})

// afficher les projets Hôtels et Restaurants
filtreHotelsResto.addEventListener("click", function () {
    toggleFiltre (filtreHotelsResto);
    projetsAll.then(HR => displayHR(HR));
})