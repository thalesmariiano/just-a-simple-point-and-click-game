
console.log("%cJSPCG", "font:30pt arial")
console.log("%cOpa, amigo. Você não deveria estar aqui...", "background-color: black; font-size:15pt")
//console.log("Ícone de engrenagem feito por: https://www.freepik.com // www.flaticon.com/br/")

var score            = document.getElementById("score")
var recorde          = document.getElementById("recorde")
var canvas           = document.getElementById("canvas")

var container        = document.getElementById("container")
var playcontainer    = document.getElementById("playContainer")
var stopcontainer    = document.getElementById("stopContainer")
var losecontainer    = document.getElementById("loseContainer")
var wincontainer     = document.getElementById("winContainer")
var modescontainer   = document.getElementById("modesContainer")
var optionscontainer = document.getElementById("optionsContainer")
var containerheader  = document.getElementById("containerHeader")

var levels           = document.getElementById("levels")
var gameconfig       = document.getElementById("gameConfig")
var back             = document.getElementById("back")
var back2            = document.getElementById("back2")

var timer            = document.getElementById("gameTimer")
var gamename         = document.getElementById("gameName")
var nextlevel        = document.getElementById("nextLevel")

var checkBox         = document.getElementsByClassName("checkBoxBubble")

var mode             = 1 // Padrão
var canvasY          = 450
var canvasX          = 1100
var isChecked        = false


// Coloca animação nos elementos
function animation(element, animationClass, boolean){
	if(boolean == false){
		element.classList.add(`${animationClass}`)
		element.style.display = "flex"
		setTimeout(function(){
			element.classList.remove(`${animationClass}`)
		}, 310)
	}else if(boolean == true){
		element.classList.add(`${animationClass}`)
		setTimeout(function(){
			element.classList.remove(`${animationClass}`)
			element.style.display = "none"
		}, 310)
	}
}

// Gerar numeros aleatorios
function randomNumber(max, min){
	return Math.floor(Math.random() * (max - min)) + min
}

// Pegar tamanho da tela
if(window.innerWidth <= 480) {
	canvasX = 280
}else if(window.innerWidth <= 768) {
	canvasX = 670
}

// Botões de inicio do jogo
levels.addEventListener("click", function(){
	modescontainer.style.display = "flex"
	playcontainer.style.display = "none"
})

back.addEventListener("click", function(){
	modescontainer.style.display = "none"
	playcontainer.style.display = "flex"
})

back2.addEventListener("click", function(){
	playcontainer.style.display = "flex";
	optionscontainer.style.display = "none";
})

gameconfig.addEventListener("click", function(){
	playcontainer.style.display = "none";
	optionscontainer.style.display = "flex";
})


// Codigo da checkbox
document.getElementsByClassName("checkBoxBack")[0].addEventListener("click", function(){
	if(isChecked == false){
		checkBox[0].classList.add("checkBox")
		isChecked = true
	}else if(isChecked == true){
		checkBox[0].classList.remove("checkBox")
		isChecked = false
	}
})

// Escolher modo de jogo
function gameModes(m){
	mode = m
	switch(mode){
		case 1:
			gamename.innerHTML = "Point And Click"
			pontos = localStorage.getItem("pontos")
			recorde.innerHTML = `Seu recorde: ${pontos}`
		break;
		
		case 2:
			gamename.innerHTML = "Random Cubes"
			cubePoints = localStorage.getItem("randomBlocksPoints")
			recorde.innerHTML = `Seu recorde: ${cubePoints} cubos`
		break;
	}
}

// Iniciar o jogo
function iniciar(){

	animation(playcontainer, "animate__fadeOut", true)
	animation(containerheader, "animate__fadeIn", false)

	switch(mode){
		case 1:
			pointAndClick()
		break;
		
		case 2:
			randomCube()
		break;

		case 3:
			runCubeRun()
		break;
	}
}

// Pausar o jogo
function pause(){
	switch(mode){
		case 1:
			animation(stopcontainer, "animate__fadeIn", false)
			animation(containerheader, "animate__fadeOut", true)
			clearInterval(locationTimer)
		break;
		
		case 2:
			animation(stopcontainer, "animate__fadeIn", false)
			animation(containerheader, "animate__fadeOut", true)
			clearInterval(gerarCubo)
			clearInterval(partidaInterval)
		break;
	}
}

// Resumir o jogo
function resume(){
	switch(mode){
		case 1:
			animation(stopcontainer, "animate__fadeOut", true)
			animation(containerheader, "animate__fadeIn", false)
			cubeLocation(1500, true)
		break;
		
		case 2:
			alert("Resumir não funciona nesse modo ainda.")
		break;
	}
}

// Reinciar jogo
function restart(){
	switch(mode){
		case 1:

		break;
		
		case 2:
			cubes = 10
			animation(losecontainer, "animate__fadeOut", true)
			animation(wincontainer, "animate__fadeOut", true)
			animation(containerheader, "animate__fadeIn", false)
			container.style.border = `1px solid white`
			timer.style.color = `white`
			cubeNumberDel = 0
			clearInterval(partidaInterval)
			deleteCube = setInterval(function(){
				cubeNumberDel++
				if(document.getElementsByClassName("cube").length > 0){
				canvas.removeChild(document.getElementById(`${cubeNumberDel}`))
				}else{
					clearInterval(deleteCube)
					randomCube()
				}
			}, 1)
		break;
	}
}

// Voltar para ao Menu
function backToMenu(){
	switch(mode){
		case 1:
			animation(stopcontainer, "animate__fadeOut", true)
			animation(playcontainer, "animate__fadeIn", false)
			canvas.removeChild(cubo)
		break;
		
		case 2:
			animation(stopcontainer, "animate__fadeOut", true)
			animation(losecontainer, "animate__fadeOut", true)
			animation(wincontainer, "animate__fadeOut", true)
			animation(playcontainer, "animate__fadeIn", false)
			timer.style.color = `white`
			container.style.border = `1px solid white`
			cubes = 10
			cubeNumberDel = 0
			deleteCube = setInterval(function(){
				cubeNumberDel++
				if(document.getElementsByClassName("cube").length  > 0){
				canvas.removeChild(document.getElementById(`${cubeNumberDel}`))
				}else{
					clearInterval(deleteCube)
				}
			})
			clearInterval(partidaInterval)
		break;
	}
}

// Proximo nivel do Random Cubes
function nextLevel(){
	switch(mode){
		case 1:

		break;

		case 2:
			animation(containerheader, "animate__fadeIn", false)
			animation(wincontainer, "animate__fadeOut", true)
			cubes += 5
			cubecount.innerHTML = cubes
			timer.style.color = `white`
			container.style.border = `1px outset white`
			randomCube()
			salvarPontos()
		break;
	}
}

// Salvar pontos do jogo
function salvarPontos(){

	switch(mode){
		case 1:
			if(point >= localStorage.getItem("pontos")){
				localStorage.setItem("pontos", point)
				recorde.innerHTML = `Seu recorde: ${point}`
			}
		break;

		case 2: {
			if(cubes >= localStorage.getItem("randomBlocksPoints")){
				localStorage.setItem("randomBlocksPoints", cubes)
				recorde.innerHTML = `Seu recorde: ${cubes} cubos`
			}
		}
	}
}