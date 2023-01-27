let map = L.map('map').setView([50.6354, 3.0623], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const url = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone";
let affichage = document.querySelector(".banniere");

 // On peut faire une requête HTTP en Ajax avec les méthodes Fetch ou XHR
// On utilise Fectch de la manère suivante
fetch(url)
    .then((response) => response.json())
    .then((response) => {

        const lieux = response.records;

        console.log(lieux[2].fields.title);

        // Une boucle for of pour lire mon Array
        for (let lieu of lieux) {
            // console.log(lieu.fields.title);
            console.log(lieu.fields.geolocalisation);
            let marker = L.marker(lieu.fields.geolocalisation).addTo(map);

            marker.addEventListener("click", affichageBanniere);
            
            function affichageBanniere() {
                affichage.innerHTML = `
                <div class="banniereTop">
                    <div class="imgdescription">
                        <img class="image" src="assets/images/1754890-200.png" alt="photo empty">
                    </div>
                    <div class="titreRestau"><h1>${lieu.fields.title}</h1><br>
                        <p class="contact">${lieu.fields.contact}</p>  
                        <p class="infos">${lieu.fields.infos}</p>        
                    </div>
                    <div class="btndescription">
                        <button class="btnSave">Enregistrer</button>
                        <button class="btnX">X</button>
                    </div> 
                </div> `;
                // Fonction onclick avec ciblage de mon bouton delete
                affichage.onclick = (event) => {
                    let target = event.target;
                    if (target.className === "btnX") {
                        target.parentElement.parentElement.remove();
                    } else if (target.className === "btnSave") {

                        const mesFavs = 'favoris';
                        const favString = localStorage.getItem(mesFavs);
                        const favoris = JSON.parse(favString) ?? [];
                        let titre = lieu.fields.title;
                        let contact = lieu.fields.contact;
                        let infos = lieu.fields.infos;
                        const newFavoris = { titre, contact, infos };

                        favoris.push(newFavoris);

                        localStorage.setItem(mesFavs, JSON.stringify(favoris));
                        alert('Ajout au favoris');

                    }


                    
                }
            }
        }
    })