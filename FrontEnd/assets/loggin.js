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
    }).then(res => res.json()) // if res pas 200 throw error
        .then(function (data) {
            const messageErreur = document.getElementById("messageErreur");
            if (data.message !== undefined) {
                messageErreur.innerHTML = `
                Une erreur est survenue: ${data.message} !`;
                throw new Error(data.message);
            }
            else {
                messageErreur.innerHTML = ``;
                localStorage.setItem("token", data.token);    
                location.href = "index.html";        
            }
        })
        .catch(error => console.log(error));
})