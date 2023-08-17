function loadGame()
{
    //reset
    document.body.innerHTML = "";
    //remplissage et mise ne page
    let banner = document.createElement("div");
    banner.style.backgroundColor = "red";
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

    //creation et ajout des tuiles
    for(let i=0 ; i<16 ; i++)
    {
        const element = document.createElement('div');
        element.id = "card n " + i;
        element.style.width = "25%";
        element.style.height = "25%";
        element.style.display="flex";
        element.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        gameGrid.appendChild(element);
    }
    
}

loadGame();
loadGame();
loadGame();
loadGame();