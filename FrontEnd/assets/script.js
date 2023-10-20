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
fetchProjets().then(projets => displayProjets(projets));


// ----------  filtrage des projets - (Event listener)
const filtres = document.getElementsByClassName("filtreOn")
const filtreTous = document.getElementById("Tous")
const filtreObjets = document.getElementById("Objets")
const filtreAppartements = document.getElementById("Appartements")
const filtreHotelsResto = document.getElementById("HotelsResto")

// changer le bouton actif et vider la gallerie
function toggleFiltre(boutonActif) {
    const filtreOn = filtres[0]
    filtreOn.classList.toggle("filtreOn")
    boutonActif.classList.toggle("filtreOn")
    gallery.innerHTML = ("");
}

// afficher tous les projets
filtreTous.addEventListener("click", function () {
    toggleFiltre(filtreTous);
    fetchProjets().then(function (data) {
        displayProjets(data)
    })
})

// afficher les projets objets
filtreObjets.addEventListener("click", function () {
    toggleFiltre(filtreObjets);
    fetchProjets().then(function (data) {
        displayObjets(data)
    })
})

// afficher les projets Appartements
filtreAppartements.addEventListener("click", function () {
    toggleFiltre(filtreAppartements);
    fetchProjets().then(function (data) {
        displayAppart(data)
    })
})

// afficher les projets Hôtels et Restaurants
filtreHotelsResto.addEventListener("click", function () {
    toggleFiltre(filtreHotelsResto);
    fetchProjets().then(function (data) {
        displayHR(data)
    })
})

//test pour le token
const token = localStorage.getItem("token");
const linkLog = document.getElementById("linkLog");
const modif =  document.getElementById("modifProjets");
const boiteFiltres = document.getElementById("filtresBox");
if (token == null) {
    linkLog.innerHTML = `
    <a href="loggin.html">login</a>
    `;
    modif.innerHTML = `
    `;
    if (boiteFiltres.classList == ("cacher")) {
        boiteFiltres.classList.remove("cacher");
        boiteFiltres.innerHTML = `
        <div id="Tous" class="button btsml filtreOn">Tous</div>
				<div id="Objets" class="button btsml">Objets</div>
				<div id="Appartements" class="button">Appartements</div>
				<div id="HotelsResto" class="button">Hôtels & restaurants</div>
        `;
    }
}
else {
    console.log("Un token a été détecté!");
    linkLog.innerHTML = `
    <a id="logout" href="">logout</a>
    `;
    modif.innerHTML = `
    <img src="./assets/icons/iconEdit.png">
					<p>modifier</p>
    `;
    boiteFiltres.innerHTML = `
    <div class="vide"></div>
    `;
    boiteFiltres.classList.add("cacher");
    //fonction pour log out
    const loggout = document.getElementById("logout");
    loggout.addEventListener("click", function () {
        localStorage.removeItem("token");
    })
}

