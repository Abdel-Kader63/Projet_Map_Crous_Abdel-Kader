let afficherPageFav = document.querySelector(".ajouterFavoris")
let save = JSON.parse(localStorage.getItem('favoris'));


function favorisPage() {

    for (i = 0; i < save.length; i++) {


        afficherPageFav.innerHTML += `
    <div class="banniereTop">
        <div class="imgdescription">   
            <img class="image" src="assets/images/1754890-200.png" alt="photo empty">
        </div>
        <div class="titreRestau"><h1>${save[i].titre}</h1>
            <p class="contact">${save[i].contact}</p>  
            <p class="infos">${save[i].infos}</p>        
        </div>
        <div class="btndescription">
            <button class="btnX">X</button>
        </div> 
    </div>` ;
    }
}

favorisPage();

afficherPageFav.onclick= (event) => {
    let target = event.target;
    if (target.className == "btnX") {
        target.parentElement.parentElement.remove();
        localStorage.clear()
    }
}