const formulaire = document.getElementById("formConnect");

formulaire.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formulaire);
    // console.log("Envoyé: ");
    // console.log("Email: " + formData.get('email'));
    // console.log("Mot de Passe: " + formData.get('password'));
    const data = Object.fromEntries(formData);

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(function (data) {
            const messageErreur = document.getElementById("messageErreur");
            if (data.message !== undefined) {
                messageErreur.innerHTML = `
                Une erreur est survenue: ${data.message} !`;
                throw new Error(data.message);
            }
            else {
                messageErreur.innerHTML = ``;
                console.log("reponse serveur: ");
                console.log(data);    
                window.localStorage.setItem("token", data.token);    
                window.location.href = "index.html";        
            }
        })
        .catch(error => console.log(error));
})

//email: sophie.bluel@test.tld
//password: S0phie 
