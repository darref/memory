let toggleClick = false;
let previousTileImageClicked = "";
let previousTileClicked:HTMLDivElement ;
let nbCoups = 0;
let voidDiv:HTMLDivElement ;
let alreadyFoundTiles:Array<HTMLDivElement> = [];

// Fonction pour mélanger un tableau de manière aléatoire (algorithme de Fisher-Yates)
function melangerTableauTiles(tableau:Array<HTMLDivElement> , tableauImages:Array<string>) {
    for (let i = tableau.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
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
    document.body.style.backgroundImage = "url(memoryBackground.jpg)";
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
            //choix aleatoire
            let randomIndice = getRandomInt(8);
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

            if(e != previousTileClicked && !alreadyFoundTiles.includes(e))
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
                        e.style.backgroundImage = ""; // on reinitialise les deux images cliquées
                        previousTileClicked.style.backgroundImage = "";
                    }
                    else // sinon c'est qu on a trouvé la paire 
                    {
                        nbCoups++;
                        e.style.backgroundImage = allImages[i];
                        alreadyFoundTiles.push(e, previousTileClicked);
                    }
                    toggleClick = false;
                    previousTileClicked = voidDiv;
                }
            }
                
        });
    });
}


    
    
    
    


loadGame();