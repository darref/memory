let toggleClick = false;
let previousTileImageClicked = "";
let previousTileClicked:HTMLDivElement ;
let nbCoups = 0;
let voidDiv:HTMLDivElement ;
let alreadyFoundTiles:Array<HTMLDivElement> = [];
let busy:boolean = false;

// Fonction pour mélanger un tableau de manière aléatoire (algorithme de Fisher-Yates)
function melangerTableauTiles(tableau:Array<HTMLDivElement> , tableauImages:Array<string>) {
    for (let i = tableau.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (tableau.length - 1));
      [tableau[i], tableau[j]] = [tableau[j], tableau[i]]; // Échanger les éléments
      [tableauImages[i], tableauImages[j]] = [tableauImages[j], tableauImages[i]]; // Échanger les éléments
    }
}

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

function loadGame()
{
    //reset
    nbCoups = 0;
    document.body.innerHTML = "";
    //fond d ecran abstract
    document.body.style.backgroundImage = "url(/memoryBackground.jpg)";
    //remplissage et mise ne page
    let banner = document.createElement("div");
    banner.style.backgroundColor = "white";
    banner.style.width = "800px";
    banner.style.height = "70px";
    banner.style.margin = "20px";

    let title = document.createElement("h1");
    title.style.fontSize = "30px";
    title.textContent = "Memory Game";
    title.style.textAlign = "center";

    let gameGrid = document.createElement("div");
    gameGrid.style.backgroundColor = "blue";
    gameGrid.style.width = "800px";
    gameGrid.style.height = "800px";
    gameGrid.style.display = "flex";
    gameGrid.style.flexDirection="row";
    gameGrid.style.flexWrap = "wrap";
    gameGrid.style.border = "10px solid black";

    banner.appendChild(title);

    document.body.appendChild(banner);
    document.body.appendChild(gameGrid);

    //tableau de tiles
    let allTiles:Array<HTMLDivElement> = [];
    //creation et ajout des tuiles
    for(let i=0 ; i<16 ; i++)
    {
        const tile = document.createElement('div');
        tile.id = "card n " + i;
        tile.style.width = "25%";
        tile.style.height = "25%";
        tile.style.display="flex";
        tile.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        gameGrid.appendChild(tile);
        //ajouter la tuile au tableau
        allTiles.push(tile);
        //tableau d images
        
    }

    // some variables ans arrays
    let allImages:Array<string> = [];
    let image:string = '';
    //recupération des images aleatoires
    for (let i = 0 ; i < 8 ; i++)
    {
        fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => 
        {
            // Maintenant, 'data' contient les données JSON de la réponse
            // Vous pouvez accéder aux URL comme ceci :
            image = data.message;
            console.log(image);
            //remplissage de l image

            allImages[i] = "url("+image+")";
            allTiles[i].style.backgroundSize = "cover";
            allTiles[i].style.backgroundRepeat = "no-repeat";
            allImages[i+8] = "url("+image+")";
            allTiles[i+8].style.backgroundSize = "cover";
            allTiles[i+8].style.backgroundRepeat = "no-repeat";
            
        })
        .catch(error => 
        {
            console.error("Une erreur s'est produite : ", error);
        })
    }

    melangerTableauTiles(allTiles,allImages);

    allTiles.forEach((e, i )=>
    {
        e.addEventListener("click" , () =>
        {

            if(e != previousTileClicked && !alreadyFoundTiles.includes(e) && !busy)
            {
                if(!toggleClick) // si on click premiere fois
                {
                    e.style.backgroundImage = allImages[i];
                    toggleClick = true;
                    previousTileImageClicked = allImages[i];
                    previousTileClicked = e;
                }
                else // sinon c'est la deuxieme fois donc on verifie le resultat
                {
                    if(allImages[i] != previousTileImageClicked) // si on a pas trouvé la paire
                    {
                        nbCoups++;
                        e.style.backgroundImage = allImages[i];
                        busy = true;
                        setTimeout(()=>{ 
                            
                            e.style.backgroundImage = ""; // on reinitialise les deux images cliquées
                            previousTileClicked.style.backgroundImage = "";
                            previousTileClicked = voidDiv;
                            busy = false;
                        }, 700);
                        
                    }
                    else // sinon c'est qu on a trouvé la paire 
                    {
                        nbCoups++;
                        e.style.backgroundImage = allImages[i];
                        alreadyFoundTiles.push(e, previousTileClicked);
                        previousTileClicked = voidDiv;
                        if(alreadyFoundTiles.length === 16)
                        {
                            goal();
                        }
                    }
                    toggleClick = false;
                    //
                }
            }
                
        });
    });
}


function affichageDemarrage()
{
    document.body.style.backgroundImage = "url(memoryBackground.jpg)";
    //
    let title = document.createElement("h1");
    title.style.fontSize = "100px";
    title.textContent = "Memory Game";
    title.style.textAlign = "center";
    title.style.backgroundColor = "white";
    document.body.appendChild(title);
    //
    let textePopupDemarrer = document.createElement("p");
    textePopupDemarrer.innerText = "Démarrer le jeu? Cliquez ici.";
    textePopupDemarrer.style.verticalAlign = "middle";
    textePopupDemarrer.style.fontSize = "30px";
    //
    let popupDemarrer = document.createElement("div");
    popupDemarrer.style.width = "15%";
    popupDemarrer.style.height = "15%";
    popupDemarrer.style.fontWeight ="bold";
    popupDemarrer.style.textAlign = "center";
    popupDemarrer.style.border = "2px solid black"
    popupDemarrer.style.backgroundColor = "blue";
    //
    popupDemarrer.append(textePopupDemarrer);
    document.body.appendChild(popupDemarrer);
    popupDemarrer.addEventListener("click" , ()=>
    {
        loadGame();
    });
}
    
function goal()
{
    document.body.innerHTML = "";
    //
    let title = document.createElement("h1");
    title.style.fontSize = "70px";
    title.textContent = "Vous avez reussi avec "+nbCoups+" coups! ";
    title.style.textAlign = "center";
    title.style.backgroundColor = "white";
    document.body.appendChild(title);
    //
    //
    let textePopupReDemarrer = document.createElement("p");
    textePopupReDemarrer.innerText = "Recommencer le jeu? Cliquez ici.";
    textePopupReDemarrer.style.verticalAlign = "middle";
    textePopupReDemarrer.style.fontSize = "30px";
    //
    let popupRedemarrerPartie = document.createElement("button");
    popupRedemarrerPartie.style.width = "30%";
    popupRedemarrerPartie.style.height = "30%";
    popupRedemarrerPartie.style.border = "2px solid black"
    popupRedemarrerPartie.style.fontStyle ="bold";
    popupRedemarrerPartie.style.textAlign = "center";
    popupRedemarrerPartie.style.backgroundColor = "red";
    //
    popupRedemarrerPartie.append(textePopupReDemarrer);
    //
    document.body.appendChild(popupRedemarrerPartie);
    popupRedemarrerPartie.addEventListener("click" , ()=>
    {
        loadGame();
    });
}
    

//
affichageDemarrage();

