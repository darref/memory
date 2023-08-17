 const app = document.createElement('div')
 app.setAttribute('id', "app")
 const body = document.querySelector('body')
 body?.appendChild(app)

 const memorygame = document.createElement('div')
 memorygame.classList.add("memory-game")
 body?.appendChild(memorygame)

 const card1 = document.createElement('div')
 card1.classList.add("card")
 card1.setAttribute('data-card', '1')
 card1.style.backgroundColor = ('red')