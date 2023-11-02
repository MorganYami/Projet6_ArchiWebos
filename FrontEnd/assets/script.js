//  ----------  Fetch projects

async function fetchProjects() {
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

// ----------  generate fiches (functions)
// display all projects
const gallery = document.getElementById("gallery");

function displayProjects(projects) {
    projects.forEach(projects => {
        gallery.innerHTML += `
        <figure>
        <img src="${projects.imageUrl}" alt="${projects.title}">
        <figcaption>${projects.title}</figcaption>
    </figure>
        `
    });
}

// display projects objets
function displayObjets(projects) {
    let projetObjets = [];
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].categoryId == 1) {
            projetObjets.push(projects[i]);
        }
    }
    displayProjects(projetObjets);
}

// display projects Appartements
function displayAppart(projects) {
    let projetAppart = [];
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].categoryId == 2) {
            projetAppart.push(projects[i]);
        }
    }
    displayProjects(projetAppart);
}

// display projects Hôtels et Restaurants
function displayHR(projects) {
    let projetHR = [];
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].categoryId == 3) {
            projetHR.push(projects[i]);
        }
    }
    displayProjects(projetHR);
}

// ----------  initial page display
fetchProjects().then(projects => displayProjects(projects));


// ----------  projects filtering - (Event listener)
const filtres = document.getElementsByClassName("filtreOn")
const filtreTous = document.getElementById("Tous")
const filtreObjets = document.getElementById("Objets")
const filtreAppartements = document.getElementById("Appartements")
const filtreHotelsResto = document.getElementById("HotelsResto")

// change actif boutton and emptying the gallery
function toggleFiltre(boutonActif) {
    const filtreOn = filtres[0]
    filtreOn.classList.toggle("filtreOn")
    boutonActif.classList.toggle("filtreOn")
    gallery.innerHTML = ("");
}

// display all projects
filtreTous.addEventListener("click", function () {
    toggleFiltre(filtreTous);
    fetchProjects().then(function (data) {
        displayProjects(data)
    })
})

// display projects objets
filtreObjets.addEventListener("click", function () {
    toggleFiltre(filtreObjets);
    fetchProjects().then(function (data) {
        displayObjets(data)
    })
})

// display projects Appartements
filtreAppartements.addEventListener("click", function () {
    toggleFiltre(filtreAppartements);
    fetchProjects().then(function (data) {
        displayAppart(data)
    })
})

// display projects Hôtels et Restaurants
filtreHotelsResto.addEventListener("click", function () {
    toggleFiltre(filtreHotelsResto);
    fetchProjects().then(function (data) {
        displayHR(data)
    })
})

// token test
const token = localStorage.getItem("token");
const linkLog = document.getElementById("linkLog");
const modif = document.getElementById("modifProjects");
const boiteFiltres = document.getElementById("filtresBox");

// function for login
function Login() {
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

if (token == null) {
    Login();
}
else {
    const tokenExp = JSON.parse(atob(token.split(".")[1])).exp * 1000;
    const dateNow = new Date();
    if (tokenExp > dateNow.getTime()) {
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
        //log out fonction 
        const loggout = document.getElementById("logout");
        loggout.addEventListener("click", function () {
            localStorage.removeItem("token");
        })
    }
    else if (tokenExp <= dateNow.getTime()) {
        // console.log(tokenExp);
        // console.log(dateNow.getTime());
        Login();
        localStorage.removeItem("token");
        console.log("Error: token expired");
    }
}


// ------------------ modale window

const croixFermer = document.getElementById("close");
const modaleBackground = document.getElementById("modaleBackground");
const modale = document.getElementById("modale");
const modaleOn = document.getElementById("modifProjects");

// generate gallery photos modale window
function genererPhotosModale(projects) {
    const photoList = document.getElementById("photoList");
    projects.forEach(projects => {
        photoList.innerHTML += `
        <div class="photoProjet">
            <img class="photoProjetIn" src="${projects.imageUrl}" alt="${projects.title}">
			<img class="bin" src="./assets/icons/iconBin.png">
		</div>
        `
    });
}

//open modale window
function ouvrirModale() {
    modaleBackground.classList.toggle("Rien");
    modale.classList.toggle("displayFlex");
    modale.classList.toggle("Rien");
    fetchProjects().then(projects => genererPhotosModale(projects));
}
modaleOn.addEventListener("click", ouvrirModale);

// close modale window
function fermerModale() {
    modaleBackground.classList.toggle("Rien");
    modale.classList.toggle("displayFlex");
    modale.classList.toggle("Rien");
    photoList.innerHTML = ``;
}
croixFermer.addEventListener("click", fermerModale);
