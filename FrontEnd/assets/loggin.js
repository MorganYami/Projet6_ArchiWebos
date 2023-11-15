const formulaire = document.getElementById("formConnect");
formulaire.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formulaire);
    const data = Object.fromEntries(formData);

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.status == 200) {
            res.json()
                .then(function (data) {
                    const messageErreur = document.getElementById("messageErreur");
                    messageErreur.innerHTML = ``;
                    localStorage.setItem("token", data.token);    
                    location.href = "index.html";
                })
        }
        else if (res.status == 404) {
            res.json()
                .then(function (data) {
                    messageErreur.innerHTML = `
                    Une erreur est survenue: ${data.message} !`;
                    throw new Error(data.message);
                }).catch(error => console.error("404: ", error));
        }
        else if (res.status == 401) {
            messageErreur.innerHTML = `
            Une erreur est survenue: mot de passe incorrect !`;
            console.error("Error 401: password unknow")
        }
        else {
            messageErreur.innerHTML = `
            Une erreur est survenue: erreur ${res.status} !`;
            console.error("error", res.status)
        }
    })
})