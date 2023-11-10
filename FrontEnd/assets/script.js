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

// --------------- token test
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
        //Logout the user
        const loggout = document.getElementById("logout");
        loggout.addEventListener("click", function () {
            localStorage.removeItem("token");
        })
    }
    else if (tokenExp <= dateNow.getTime()) {
        Login();
        localStorage.removeItem("token");
        console.log("Error: token expired");
    }
}


// ------------------ modale window

const close = document.getElementById("close");
const modaleBackground = document.getElementById("modaleBackground");
const modale = document.getElementById("modale");
const modaleOn = document.getElementById("modifProjects");

// generate gallery
function genererPhotosModale(projects) {
    const modaleIntern = document.getElementById("modaleIntern");
    modaleIntern.innerHTML = `
    <h2 class="modaleTitle">Galerie Photo</h2>
    <div id="photoList" class="photoList">
    </div>
    <button id="ajouterPhoto">Ajouter une photo</button>`;
    const photoList = document.getElementById("photoList");
    projects.forEach(projects => {
        photoList.innerHTML += `
        <div class="photoProjet">
            <img class="photoProjetIn" src="${projects.imageUrl}" alt="${projects.title}">
			<img class="bin" src="./assets/icons/iconBin.png" id="bin${projects.id}">
		</div>
        `;
    });
    binListener();
}

// deleting project
function binListener() {
    const bins = document.querySelectorAll(".bin");
    bins.forEach(function (currentValue) {
        currentValue.addEventListener("click", function () {
            const deleteId = this.id.split("bin")[1];
            console.log("Supprimer photo n°: ", deleteId);
            DeleteProject(deleteId, token);
        })
    });
}

// activating the 'valider' button
function validerOn() {
    let photoValue = document.getElementById("addPhotoInput").value;
    let PhotoTitleValue = document.getElementById("PhotoTitle").value;
    let PhotoCategorieValue = document.getElementById("categorie").value;
    if (PhotoTitleValue && photoValue && PhotoCategorieValue) {
        document.getElementById("valider").removeAttribute("disabled");
    }
}

// previewing photo to upload
function previewPicture(photo) {
    const toggledefault = document.querySelectorAll(".addPhotoBox > *");
    toggledefault.forEach(function (element) {
        element.classList.toggle("hidden");
    })
    const [image] = photo.files;
    let types = ["image/jpg", "image/png"];
    if (types.includes(image.type)) {
        if (image) {
            const reader = new FileReader();
            reader.onload = function (photo) {
                document.getElementById("imgPreview").src = photo.target.result
            }
            reader.readAsDataURL(image);
        }
    }
    validerOn();
}

// modale for adding a photo
function addphoto() {
    document.getElementById("ajouterPhoto").addEventListener("click", function () {
        document.getElementById("modaleIntern").innerHTML = `
        <img id="back" class="back" src="./assets/icons/arrow-left-icon-2048x1433-le08mlmd.png">
        <h2 class="modaleTitle">Ajout Photo</h2>
        <form id="newProject" class="addPhotoForm displayFlex flexCol" method="post">
            <div id="addPhotoBox" class="addPhotoBox displayFlex flexCol centerFlex">
                <input id="addPhotoInput" class="addPhotoInput Rien" type="file" name="imageUrl" accept=".jpg, .png" onchange="previewPicture(this)" required>
                <img class="photoDefault" src="./assets/icons/imageDefault.png">
                <input id="photoPlus" class="button" type="button" value="+ Ajouter photo">
                <p>jpg, png : 4mo max</p>
                <img id="imgPreview" class="imgPreview hidden" src="">
            </div>
            <label for="PhotoTitle">Titre</label>
            <input id="PhotoTitle"  class="shadow" type="text" name="title" onchange="validerOn()" required>
            <p>Catégorie</p>
            <select id="categorie" class="shadow" list="Categories" name="categorieId" id="Categorie" onchange="validerOn()" required>
                <option value="">  </option>
                <option value="1">Objets</option>
                <option value="2">Appartements</option>
                <option value="3">Hotels & restaurants</option>
            </select>
            <div class="lineForm"></div>
            <input id="valider" class="button whiteText" type="submit" value="Valider" disabled>
        </form>
        `;
        // adding project
        const formulaire = document.getElementById("newProject");
        formulaire.addEventListener('submit', event => {
            const bearerToken = 'Bearer ' + token;
            const formData = new FormData(formulaire);
            event.preventDefault();
            console.log("sending...", formData);
            fetch("http://localhost:5678/api/works", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Authorization": bearerToken
                },
                body: formData
            }).then(response => console.log(response));
            // if (response.ok === true) {
            //     console.log("Un nouveau projet a été ajouté: ", response);
            // }
            // else {
            //     console.log("Une Erreur est survenue!!!")
            // }
        });
        back();
        //adding photo
        const inputAddPhoto = document.getElementById("addPhotoInput");
        const buttonAddPhoto = document.getElementById("photoPlus");
        buttonAddPhoto.addEventListener("click", function () {
            if (inputAddPhoto) {
                inputAddPhoto.click();
            }
        },
            false,
        );
    });
}

//go back to the gallery
function back() {
    const backArrow = document.getElementById("back");
    if (backArrow) {
        backArrow.addEventListener("click", function () {
            fetchProjects().then(projects => genererPhotosModale(projects))
                .then(addphoto);
        });
    };
}

//open modale window
function openModale() {
    modaleBackground.classList.toggle("Rien");
    modale.classList.toggle("displayFlex");
    modale.classList.toggle("Rien");
    fetchProjects().then(projects => genererPhotosModale(projects))
        .then(addphoto);
}
modaleOn.addEventListener("click", openModale);

// close modale window
function closeModale() {
    modaleBackground.classList.toggle("Rien");
    modale.classList.toggle("displayFlex");
    modale.classList.toggle("Rien");
    if (typeof photoList !== 'undefined') {
        photoList.innerHTML = ``;
    };
    gallery.innerHTML = ("");
    fetchProjects().then(projects => displayProjects(projects));
}
close.addEventListener("click", closeModale);



// deleting project
async function DeleteProject(id, token) {
    const UrlDelete = "http://localhost:5678/api/works/" + id;
    const bearerToken = 'Bearer ' + token;
    const response = await fetch(UrlDelete, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Authorization": bearerToken,
            "Content-Type": "application/json"
        }
    })
    if (response.ok === true) {
        console.log("Projet ", id, " a été effacé!");
    }
    //regenerate gallery
    fetchProjects().then(projects => genererPhotosModale(projects))
        .then(addphoto);
}